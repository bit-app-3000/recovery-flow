import { tap, periodic, effect, until, empty, filter } from '@at/most'
import { pullSubscribe, jc } from '@at/nats'
import { DURABLE } from '@at/configs'
import { composeAsync, ERR } from '@at/utils'

export async function Pull ({ subject, handler, max = 1, expires = 1000, period = 100, down$ = empty() }) {
  let batch = max
  const callbackFn = async (e, m) => e ? failure(m)(e) : composeAsync(complete(m), handler, begin(m))()
  const subOpts = { mack: true, config: { durable_name: DURABLE[subject] }, callbackFn }
  const sub = await pullSubscribe(subject, subOpts)

  const begin = m => () => {
    m.working()
    batch--
    return jc.decode(Buffer.from(m.data))
  }
  const complete = m => () => {
    m.ack()
    batch++
  }
  const failure = m => e => {
    batch++
  }

  const pull = () => sub.pull({ batch, expires })
  const pullFilter = () => Boolean(batch > 0)

  effect(
    until(down$,
      tap(pull,
        filter(pullFilter,
          periodic(period)))))
    .catch(ERR)
}
