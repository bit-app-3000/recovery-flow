import { randomUUID } from 'node:crypto'
import request from 'superagent'
import { effect, periodic, tap, withItems, fromPromise, chain, map, filter } from '@at/most'
import { ERR, timeOut } from '@at/utils'
import { SVC } from '@at/configs'
import { Stat } from '@at/sinks'

const { port, host, protocol } = SVC.svcA
const uri = `${protocol}://${host}:${port}/command`

const stat = await Stat({ name: 'LOADER', metric: ['req', 'res', 'error'] })

const size = 10000
let busy = 100

const command = async () => {
  stat('req')

  const req = request.post(uri).send({ payload: randomUUID() }).catch(() => stat('error'))
  return Promise.race([req, timeOut(10000)])
}

const isBusy = () => busy > 0 ? busy-- : false

const done = (res) => {
  stat('res')
  busy++
}

effect(
  tap(done,
    chain(fromPromise,
      map(command,
        withItems(Array(size),
          filter(isBusy,
            periodic(1)))))))
  .catch(ERR)
