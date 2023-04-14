import { effect, periodic, map, tap, filter } from '@at/most'
import { ncConnect, jc } from '@at/nats'
import { ERR } from '@at/utils'

export async function Pub ({ period = 1 }) {
  const Q = []
  const nc = await ncConnect()

  const pub = (subject, data) => Q.push({ subject, data })
  const publish = ({ subject, data }) => nc.publish(subject, jc.encode(data))
  const getValue = () => Q.shift()
  const qLen = () => Boolean(Q.length)

  effect(
    tap(publish,
      filter(Boolean,
        map(getValue,
          filter(qLen,
            periodic(period))))))
    .catch(ERR)

  return pub
}
