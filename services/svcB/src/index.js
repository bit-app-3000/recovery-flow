import { SVC, JS, Info } from '@at/configs'
import { Nats } from '@at/nats'
import { Shutdown } from '@at/shutdown'
import { Pull, Pub } from '@at/sinks'
import { ERR } from '@at/utils'
import { Commands } from './commands.js'

const svc = SVC.svcB
const { down$ } = Shutdown()

await Nats.init()

const pub = await Pub({ period: 1 })

await Pull({ subject: JS.EXECUTE, handler: Execute, down$ })

async function Execute (data) {
  if (data) {
    let result

    const { taskId, command } = data

    try {
      result = Commands[command]
        ? command === 'create'
          ? await Commands.create(data)
          : await Commands[command](taskId)
        : { error: 'command is not allowed' }
    } catch (err) {
      result = { error: err.message }
    } finally {
      pub(JS.RESULT, { taskId, command, result })
    }
  } else {
    ERR('MRFCA')
  }
}

Info(svc)
