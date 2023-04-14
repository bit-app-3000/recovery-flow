import { effect, periodic, tap, until, empty } from '@at/most'
import { NO_OP, ERR } from '@at/utils'

const char = k => `${k}∑`

export async function Stat ({ name, metric = [], down$ = empty() }) {
  if (!metric.length) { return NO_OP }

  const keys = []

  const param = metric.reduce((acc, k) => {
    keys.push(k)
    acc[k] = 0
    acc[char(k)] = 0
    return acc
  }, {})

  const add = m => {
    param[m]++
    param[char(m)]++
  }

  const statParam = (acc, [k, v], idx) => {
    const { name, key } = idx % 2 ? { name: 'all', key: k.replace('∑', '') } : { name: 'rps', key: k }
    const row = acc[name] = acc[name] || {}
    row[key] = Number(v)
    return acc
  }

  const hasValue = ([k, v]) => keys.includes(k) ? Boolean(v) : false

  // const format = ([k, v]) => [keys.includes(k) ? k : ':', v]

  function stat () {
    if (Object.entries(param).some(hasValue)) {
      const data = Object.entries(param).reduce(statParam, {})
      console.clear()
      console.log()
      console.log('\x1b[35m', String.fromCharCode(9889), name, '\x1b[0m')
      console.table(data)
      console.log()

      // LOG(`${name} ${String.fromCharCode(9889)} ${Object.entries(param).map(format).flat().join('  ')}`)

      keys.forEach(k => (param[k] = 0))
    }
  }

  effect(
    until(down$,
      tap(stat, periodic(1000))))
    .catch(ERR)

  return add
}
