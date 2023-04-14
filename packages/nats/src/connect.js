import { connect, JSONCodec } from 'nats'
import { composeAsync } from '@at/utils'
import { NATS_HOST } from '@at/configs'

const connection = { servers: NATS_HOST }
const jc = JSONCodec()

const ncConnect = async () => connect(connection)
const jsmConnect = async nc => nc.jetstreamManager()
const jsStr = nc => nc.jetstream()

const controlConnect = composeAsync(jsmConnect, ncConnect)
const jsConnect = () => composeAsync(jsStr, ncConnect)(connection)

async function pullSubscribe (subject, opts) {
  const js = await jsConnect()
  return js.pullSubscribe(subject, opts)
}

async function kvConnect (name, opts) {
  const js = await jsConnect()
  return js.views.kv(name, opts)
}

export {
  jc,
  pullSubscribe,
  ncConnect,
  controlConnect,
  jsConnect,
  kvConnect
}
