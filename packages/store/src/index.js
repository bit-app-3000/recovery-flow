import { kvConnect, jc } from '@at/nats'
import { KV_NAME, KV_OPTS } from '@at/configs'
// import { LOG } from '@at/utils'

const kv = await kvConnect(KV_NAME, KV_OPTS)

const get = taskId => kv.get(taskId).then(v => v && v.value ? jc.decode(v.value) : false)
const create = task => kv.create(task.taskId, jc.encode(task)).then(() => task)

const put = async task => {
  const { taskId } = task
  const curr = await get(taskId)
  const updated = { ...curr, ...task }
  return kv.put(taskId, jc.encode(updated)).then(() => updated)
}

async function set (task) {
  const { taskId } = task
  const curr = await get(taskId)
  return curr ? put(task) : create(task)
}

export const Store = {
  get, set, create, put
}
