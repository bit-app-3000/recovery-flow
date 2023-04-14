import { LOG, ERR, composeAsync } from '@at/utils'
import { JS } from '@at/configs'
import { controlConnect } from './index.js'

const mapStreams = ([name, subject]) => ({ name, retention: 'workqueue', subjects: [subject] })
const streams = Object.entries(JS).map(mapStreams)

const initMap = jsm => streams.map(config => jsm.streams.add(config))
const purgeMap = jsm => Object.keys(JS).map(str => jsm.streams.purge(str))
const clearMap = jsm => Object.keys(JS).map(str => jsm.streams.delete(str))

const initAll = composeAsync(initMap, controlConnect)
const purgeAll = composeAsync(purgeMap, controlConnect)
const clearAll = composeAsync(clearMap, controlConnect)

const init = async () =>
  Promise
    .all(await initAll(null))
    .then(() => LOG('Streams init'))
    .catch(e => ERR('Streams init', e))

const purge = async () =>
  Promise
    .all(await purgeAll(null))
    .then(() => LOG('Streams purge'))
    .catch(e => ERR('Streams purge', e))

const clear = async () =>
  Promise
    .all(await clearAll(null))
    .then(() => LOG('Streams del'))
    .catch(e => ERR('Streams del', e))

export const Nats = {
  init,
  purge,
  clear
}
