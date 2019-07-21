import {EventEmitter2} from 'eventemitter2'

const eventEmitter = new EventEmitter2()
eventEmitter.setMaxListeners(30)

export default eventEmitter
