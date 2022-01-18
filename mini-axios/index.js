function Axios(config) {
  this.default = config;
  this.interceptors = {}
}

Axios.prototype.request = function (config) {
  if (!config.method) {
    config.method = this.default.method ? this.default.method : 'get'
  }
  // 1. config 处理
  // 2. promise 对象 var promise = Promise.resolve(config)
  var promise = Promise.resolve(config)
  // 3. 数组 var chain = [dispatchRequest, undefined];
  var chain = [dispatchRequest, undefined];
  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift())
  }
  return promise
}

function dispatchRequest(config) {
  return xhrAdapter(config).then(res => {
    return res
  }, err => {
    throw err
  })
}

function xhrAdapter(config) {
  return new Promise((resolve, reject) => {
    let xhr = new XMLHttpRequest()
    xhr.open(config.method, config.url, true)
    xhr.send()
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status >= 200 && xhr.status < 300) {
          let { response: data, status, statusText } = xhr
          let headers = xhr.getAllResponseHeaders()
          resolve({
            config,
            data: JSON.parse(data),
            headers,
            request: xhr,
            status,
            statusText,
          })
        }
        else {
          reject(new Error('请求失败' + xhr.status))
        }
      }
    }
  })
}

Axios.prototype.get = function (config) {
  return this.request({ ...config, method: 'get' })
}
Axios.prototype.post = function (config) {
  return this.request({ ...config, method: 'post' })
}



function createInstance(config) {
  let context = new Axios(config)
  let instance = Axios.prototype.request.bind(context)
  Object.keys(Axios.prototype).forEach(key => {
    instance[key] = Axios.prototype[key].bind(context)
  })
  Object.keys(context).forEach(key => {
    instance[key] = context[key]
  })
  return instance
}

const axios = createInstance({ method: 'get' })

axios({ method: 'get', url: 'http://127.0.0.1:4523/mock/1456/user/info' })
  .then(res => { console.log(res) })