import { composeAsync, delay as d } from '@at/utils'
import { Store } from '@at/store'
import { randomInt } from 'node:crypto'
import { Signature } from '@at/signature'
import { DELAY_IS_APPROVED, DELAY_APPROVE, DELAY_SIGN, DELAY_SEND } from '@at/configs'

import { Stat } from '@at/sinks'

const stat = await Stat({ name: 'svc:B', metric: ['create', 'isApproved', 'approve', 'sign', 'send'] })

const delay = config => async data => {
  const [min, max] = config.split(':').map(Number)
  return d(randomInt(min, max)).then(() => data)
}
const set = ({ task, result }) =>
  Store.set(task).then(() => result)

async function create ({ taskId, payload }) {
  stat('create')
  return Store.create({ taskId, payload })
}

async function isApproved (task) {
  stat('isApproved')
  return Boolean(task.isApproved)
}

async function approve (task) {
  stat('approve')
  task.isApproved = true
  return { task, result: true }
}

async function sign (task) {
  stat('sign')
  const { payload } = task
  const signature = Signature.sign(payload)
  task.verify = Signature.verify(payload, signature)
  task.signature = signature
  return { task, result: { signature } }
}

async function send (task) {
  stat('send')
  const transactionHash = task.taskId // Signature.txn(task)
  task.transactionHash = transactionHash
  return { task, result: { transactionHash } }
}

export const Commands = {
  create,
  isApproved: composeAsync(isApproved, delay(DELAY_IS_APPROVED), Store.get),
  approve: composeAsync(set, approve, delay(DELAY_APPROVE), Store.get),
  sign: composeAsync(set, sign, delay(DELAY_SIGN), Store.get),
  send: composeAsync(set, send, delay(DELAY_SEND), Store.get)
}
