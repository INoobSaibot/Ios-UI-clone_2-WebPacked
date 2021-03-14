import {EventEmitter} from '../../common-components/EventEmitter/eventEmitter'

class App {
    constructor() {

    }

    subscribeEventChannel(eventname, callBack){
        EventEmitter.subscribe(eventname,callBack)
    }

    broadcastEvent(eventName){
        EventEmitter.dispatch(eventName)
    }
}

export default App;

