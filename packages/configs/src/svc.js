import { INF } from '@at/utils'
import { IS_DEV, ZERO_HOST, LOCAL_HOST, VERSION, BUILD } from './env.js'

const def = {
  host: IS_DEV ? LOCAL_HOST : ZERO_HOST,
  protocol: 'http',
  VERSION,
  BUILD,
  port: 30000,
  backlog: 511,
  exclusive: false,
  readableAll: false,
  writableAll: false,
  ipv6Only: false
}

const setSvc = opts => Object.assign({}, def, opts)

export const SVC = {
  svcA: setSvc({
    title: 'SVC A',
    port: 9191
  }),
  svcB: setSvc({
    title: 'SVC B',
    port: 9393
  }),
  client: setSvc({
    title: 'Client',
    port: 9595
  }),
  monitor: setSvc({
    title: 'Monitor',
    port: 9797
  })
}

export const Info = svc => {
  const { VERSION, BUILD, title, protocol, host, port } = svc
  INF(`${String.fromCharCode(9763)} ${title} ${VERSION} #${BUILD} ${protocol}://${host}:${port}`)
  return svc
}
