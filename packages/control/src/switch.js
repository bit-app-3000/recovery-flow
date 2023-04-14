import { effect, merge, map, delay, now, switchLatest, tap } from '@at/most'
import { LOG, ERR } from '@at/utils'

// const request = merge(now(1), delay(100, now(55)))

const request = merge(now(1), delay(100, now(55)))

const result = map(request => {
  LOG({ request })
  return delay(100, now(request))
}, request)

effect(tap(LOG, switchLatest(result))).catch(ERR)
