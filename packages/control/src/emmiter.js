// import '@at/control/env'

import { tap, effect, periodic, withItems } from '@at/most'
import { JS } from '@at/configs'
import { ERR } from '@at/utils'
import { Pub, Stat } from '@at/sinks'

import { Dummy } from './dummy.js'

const pub = await Pub({ period: 0.1 })
const stat = await Stat({ name: 'EMITTER', metric: ['pub'] })

const size = 10000

const send = () => {
  try {
    pub(JS.EXECUTE, Dummy.command())
  } catch ({ message }) {
    ERR(message)
  }
}

const done = () => {
  stat('pub')
}

/* effect(
  tap(done,
    tap(send,
      periodic(0.1))))
  .catch(ERR) */

effect(
  tap(done,
    tap(send,
      withItems(Array(size),
        periodic(1)))))
  .catch(ERR)
