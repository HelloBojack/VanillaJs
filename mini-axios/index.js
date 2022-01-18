function Axios(config) {
  this.default = config;
  this.interceptors = {}
}

Axios.prototype.request = function (congif) {
  console.log('method:' + congif.method)
  // var chain = [dispatchRequest, undefined];
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

const axios = createInstance()

console.dir(axios)
axios({ method: 'get' })
axios.get()