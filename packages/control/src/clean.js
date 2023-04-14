// import '@at/control/env'

import { Nats } from '@at/nats'

await Nats.init()

await Promise.all([
  Nats.purge()
])
