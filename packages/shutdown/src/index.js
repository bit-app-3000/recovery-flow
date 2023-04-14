import { createAdapter, multicast } from '@at/most'
import { WRN, delay } from '@at/utils'
import { SHUTDOWN_DELAY } from '@at/configs'

let isShutdown
const [down, down$] = createAdapter()

process.once('SIGTERM', shutdown)
process.once('SIGINT', shutdown)

process.once('uncaughtException', shutdown)
process.once('unhandledRejection', shutdown)

async function shutdown (reason) {
  if (isShutdown) return
  isShutdown = true
  down(reason)

  WRN('Shutdown', reason)
  await delay(Number(SHUTDOWN_DELAY))
  WRN('Exit ...')
  process.exit(0)
}

export function Shutdown () {
  return { down, down$: multicast(down$) }
}
