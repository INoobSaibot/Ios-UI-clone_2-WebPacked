const EventEmitter = {
    events: {},
    dispatch: function (event, data) {
        if (!this.events[event]) return
        this.events[event].forEach(callback => callback(data))
    },
    subscribe (event, callback) {
        if (!this.events[event]) this.events[event] = []
        this.events[event].push(callback)
    },
    unsubscribe(val, other) {
    //    todo
        console.log(val, other)
    }
}


module.exports = { EventEmitter }