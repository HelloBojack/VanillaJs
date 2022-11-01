// utils
function isObject(obj) {
  return typeof obj == "object" && obj != null;
}
const extend = Object.assign;

const isArray = Array.isArray;
const isFunction = (e) => typeof e == "function";

const hasOwn = (obj, key) => Object.prototype.hasOwnProperty.call(obj, key);

const hasChange = (v1, v2) => v1 != v2;
// effect
let uid = 0;
let activeEffect;
let effectStack = [];
function createReactEffect(fn, options) {
  const effect = function reactiveEffect() {
    if (!effectStack.includes(effect)) {
      try {
        effectStack.push(effect);
        activeEffect = effect;
        fn();
      } finally {
        effectStack.pop();
        activeEffect = effectStack[effectStack.length - 1];
      }
    }
  };

  return effect;
}

function effect(fn, options = {}) {
  const effect = createReactEffect(fn, options);
  if (!options.lazy) {
    effect();
  }
  effect.id = uid++;
  effect._isEffect = true;
  effect.raw = fn;
  effect.options = options;
  return effect;
}

let targetMap = new WeakMap();
function track(target, type, key) {
  /*
  {target:Map}
  {name:Set}
  */
  if (!activeEffect) return;

  let depMap = targetMap.get(target);
  if (!depMap) {
    targetMap.set(target, (depMap = new Map()));
  }
  let dep = depMap.get(key);
  if (!dep) {
    depMap.set(key, (dep = new Set()));
  }
  if (!dep.has(activeEffect)) {
    dep.add(activeEffect);
  }
}

function trigger(target, type, key, newValue, oldValue) {
  const depsMap = targetMap.get(target);
  if (!depsMap) {
    return;
  } else {
    // const effect = depsMap.get(key);
    let effectSet = new Set();
    const add = (effectAdd) => {
      if (effectAdd) {
        effectAdd.forEach((effect) => effectSet.add(effect));
      }
    };
    add(depsMap.get(key));

    if (key == "length" && isArray(target)) {
      depsMap.forEach((dep, key) => {
        if (key == "length") {
          add(dep);
        }
      });
    } else {
      if (key != undefined) {
        add(depsMap.get(key));
      }
      switch (type) {
        case "ADD":
          if (isArray(target)) {
            add(depsMap.get("length"));
          }
      }
    }

    effectSet.forEach((effect) => effect());
  }
}

// reactive
// 缓存 key 必须是对象 自动垃圾回收
const reactiveWeakMap = new WeakMap();
const readonlyWeakMap = new WeakMap();

function createReactObj(target, isReadonly, baseHandlers) {
  if (!isObject(target)) return target;

  const proxyMap = isReadonly ? reactiveWeakMap : reactiveWeakMap;
  const proxyTarget = proxyMap.get(target);

  if (proxyTarget) {
    return proxyTarget;
  }

  const proxy = new Proxy(target, baseHandlers);

  proxyMap.set(target, proxy);

  return proxy;
}

function createGet(isReadonly = false, isShallow = false) {
  return function get(target, key, receiver) {
    const res = Reflect.get(target, key, receiver);
    if (!isReadonly) {
      // 不是只读
      // 收集依赖
      track(target, "GET", key);
    }
    if (isShallow) {
      return res;
    }
    if (isObject(res)) {
      return isReadonly ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const get = createGet();
const shallowGet = createGet(false, true);
const readonlyGet = createGet(true);
const shallowReadonlyGet = createGet(true, false);

function createSet(isShallow) {
  return function set(target, key, value, receiver) {
    // 数组 or 对象
    // 添加 or 修改
    const oldValue = target[key];
    let hasKey = isArray(target)
      ? Number(key) < target.length
      : hasOwn(target, key);
    const res = Reflect.set(target, key, value, receiver);
    if (!hasKey) {
      // 新增
      trigger(target, "ADD", key, value);
    } else {
      if (hasChange(value, oldValue)) {
        trigger(target, "SET", key, value, oldValue);
      }
    }

    return res;
  };
}

const set = createSet();
const shallowSet = createSet(true);

let readonlyObj = {
  set: (target, key) => {
    console.warn(`set ${target} on key ${key} failed`);
  },
};

const reactiveHandlers = {
  get,
  set,
};
const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet,
};
const readonlyHandlers = extend(
  {
    get: readonlyGet,
  },
  readonlyObj
);
const shallowReadonlyHandlers = extend(
  {
    get: shallowReadonlyGet,
  },
  readonlyObj
);

function reactive(target) {
  return createReactObj(target, false, reactiveHandlers);
}
function shallowReactive(target) {
  return createReactObj(target, false, shallowReactiveHandlers);
}
function readonly(target) {
  return createReactObj(target, true, readonlyHandlers);
}
function shallowReadonly(target) {
  return createReactObj(target, true, shallowReadonlyHandlers);
}
