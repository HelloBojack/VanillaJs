const Listener = {

  listeners: {},

  on: function (eventname, callback) {
    if (!this.listeners[eventname]) {
      this.listeners[eventname] = []
    }
    this.listeners[eventname].push(callback)
  },

  emit: function (eventname, ...args) {
    if (!this.listeners[eventname]) return
    this.listeners[eventname].map(item => item.apply(this, args))
  }
}

console.log(Listener.listeners)

Listener.on('click', function (name) { console.log("name:" + name) })
Listener.on('click', function (name, sex) { console.log("name:" + name + " sex:" + sex) })

Listener.emit('click', 'p')