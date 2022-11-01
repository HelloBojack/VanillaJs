function isObject(obj) {
  return typeof obj == "object" && obj != null;
}

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
  return function set(target, key, receiver) {
    const res = Reflect.set(target, key, receiver);
    return res;
  };
}

const set = createSet();
const shallowSet = createSet(true);

const reactiveHandlers = {
  get,
  set,
};
const shallowReactiveHandlers = {
  get: shallowGet,
  set: shallowSet,
};
const readonlyHandlers = {
  get: readonlyGet,
  set: () => {
    console.log("readonly");
  },
};
const shallowReadonlyHandlers = {
  get: shallowReadonlyGet,
  set: () => {
    console.log("readonly");
  },
};

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
