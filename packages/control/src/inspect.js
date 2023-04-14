import { KV_NAME, KV_OPTS } from '@at/configs'
import { kvConnect, jc } from '@at/nats'
import { ERR } from '@at/utils'
import { effect, chain, fromPromise, map, tap, withItems, periodic, filter } from '@at/most'

import { Stat } from '@at/sinks'

const stat = await Stat({ name: 'INSPECT', metric: ['task', 'transactionHash'] })

const kv = await kvConnect(KV_NAME, KV_OPTS)

const keys = await kv.keys()

const tasks = []
let busy = 100

// const [inspect, inspect$] = createAdapter()
const get = key => kv.get(key).then(({ value }) => jc.decode(value))

const isBusy = () =>
  busy > 0
    ? busy--
    : false

const done = task => {
  stat('task')
  task.transactionHash && stat('transactionHash')
  busy++
}

await (async () => {
  for await (const key of keys) {
    tasks.push(key)
  }

  effect(
    tap(done,
      chain(fromPromise,
        map(get,
          withItems(tasks,
            filter(isBusy,
              periodic(0.1)
            ))))))
    .catch(ERR)

})()
