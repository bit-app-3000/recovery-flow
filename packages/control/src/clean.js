import { KV_NAME, KV_OPTS } from '@at/configs'
import { kvConnect, Nats } from '@at/nats'
import { LOG } from '@at/utils'

await Nats.init()
const kv = await kvConnect(KV_NAME, KV_OPTS)

await Promise.all([
  Nats.purge(),
  kv.destroy().then(() => LOG('KV', KV_NAME, 'destroy'))
])

await kvConnect(KV_NAME, KV_OPTS).then(() => LOG('KV', KV_NAME, 'ready'))
