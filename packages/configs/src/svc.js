import { INF } from '@at/utils'
import { LOCAL_HOST, VERSION, BUILD } from './env.js'

const def = {
  protocol: 'http',
  host: LOCAL_HOST,
  port: 30000,
  backlog: 511,
  exclusive: false,
  readableAll: false,
  writableAll: false,
  ipv6Only: false,
  VERSION,
  BUILD
}

const setSvc = opts => Object.assign({}, def, opts)

export const SVC = {
  svcA: setSvc({
    title: 'SVC:A',
    port: 9191
  }),
  svcB: setSvc({
    title: 'SVC:B',
    port: 9393
  })
}

export const Info = svc => {
  const { VERSION, BUILD, title, protocol, host, port } = svc
  INF(`${String.fromCharCode(9763)} ${title} ${VERSION} #${BUILD} ${protocol}://${host}:${port}`)
  return svc
}
