import { JS } from '@at/configs'
import { createAdapter, effect, tap } from '@at/most'
import { Nats } from '@at/nats'
import { Shutdown } from '@at/shutdown'
import { Pub, Pull } from '@at/sinks'
import { ERR } from '@at/utils'
import { Result } from './controller.js'

export const { down$ } = Shutdown()

await Nats.init()
export const [execute, execute$] = createAdapter()
export const [result, result$] = createAdapter()

const pub = await Pub({ period: 1 })

await Pull({ subject: JS.RESULT, handler: result, down$ })

const Execute = data => pub(JS.EXECUTE, data)

export const Effects = (f, opts, done) => {
  effect(tap(Execute, execute$)).catch(ERR)
  effect(tap(Result, result$)).catch(ERR)

  done()
}
