function CancelToken(executor) {
  let resolvePromise;
  this.promise = new Promise((resolve) => {
    resolvePromise = resolve
  })
  executor(function (message) {
    resolvePromise(message)
  })
}

CancelToken.source = function () {
  let cancel = ''
  let token = new CancelToken(function executor(c) {
    // cancel() 执行 = resolvePromise()
    cancel = c
  })
  return {
    token: token,
    cancel: cancel
  };
}

export default CancelToken