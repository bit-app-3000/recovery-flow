import { createAdapter, multicast } from '@at/most'
import { WRN, delay } from '@at/utils'
import { SHUTDOWN_DELAY } from '@at/configs'

let isShutdown
const [down, down$] = createAdapter()

process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)

process.on('uncaughtException', shutdown)
process.on('unhandledRejection', shutdown)

function shutdown (reason) {
  if (isShutdown) return
  isShutdown = true
  down(null)
  WRN('Shutdown', reason)
  return delay(Number(SHUTDOWN_DELAY)).then(() => process.exit(0))
}

export function Shutdown () {
  return { down, down$: multicast(down$) }
}
