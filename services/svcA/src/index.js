import { SVC } from '@at/configs'
import { CommandController } from './controller.js'
import { Effects } from './fx.js'
import { Listener, Server, NotFound } from '@at/server'

const svc = SVC.svcA

async function Command (f) {
  f.post('/command', {}, CommandController)
}

Server()
  .register(Effects)
  .register(NotFound)
  .register(Command)
  .listen(svc, Listener(svc))
