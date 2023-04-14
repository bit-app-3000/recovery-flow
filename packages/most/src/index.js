import { newDefaultScheduler } from '@most/scheduler'
import { runEffects } from '@most/core'

export { awaitPromises, tap, map, zip, delay, periodic, filter, chain, fromPromise, until, empty, withItems, multicast, startWith, scan, never, throttle, switchLatest, debounce, merge, join, now } from '@most/core'
export { createAdapter } from '@most/adapter'

const scheduler = newDefaultScheduler()

export const effect = $ => runEffects($, scheduler)
