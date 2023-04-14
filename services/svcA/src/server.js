import Server from 'json-server'
import { PATH_DB, Info } from '@at/configs'
import { CommandController } from './controller.js'

export const jsonServer = svc => {
  const server = Server.create()
  const router = Server.router(PATH_DB)

  const middlewares = Server.defaults()
  server.use(middlewares)

  server.use(Server.bodyParser)

  server.post('/command', CommandController)

  server.use(router)
  server.listen(svc.port, () => Info(svc))
}
