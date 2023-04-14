import { composeAsync, delay as d, LOG } from '@at/utils'
import { Store } from '@at/store'
import { randomInt } from 'node:crypto'
import { Signature } from '@at/signature'
import { DELAY_IS_APPROVED, DELAY_APPROVE, DELAY_SIGN, DELAY_SEND } from '@at/configs'

const delay = config => async data => {
  const [min, max] = config.split(':').map(Number)
  return d(randomInt(min, max)).then(() => data)
}

const set = async ({ task, result }) => {
  return Store.set(task).then(() => result)
}

async function isApproved (task) {
  return Boolean(task.isApproved)
}

async function approve (task) {
  task.isApproved = true
  return { task, result: true }
}

async function sign (task) {
  const { payload } = task
  const signature = Signature.sign(payload)
  task.verify = Signature.verify(payload, signature)
  task.signature = signature
  return { task, result: { signature } }
}

async function send (task) {
  const transactionHash = task.taskId // Signature.txn(task)
  task.transactionHash = transactionHash
  return { task, result: { transactionHash } }
}

export const Commands = {
  isApproved: composeAsync(isApproved, delay(DELAY_IS_APPROVED), Store.get),
  approve: composeAsync(set, approve, delay(DELAY_APPROVE), Store.get),
  sign: composeAsync(set, sign, delay(DELAY_SIGN), Store.get),
  send: composeAsync(set, send, delay(DELAY_SEND), Store.get)
}
