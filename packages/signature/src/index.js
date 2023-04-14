import { createHmac, timingSafeEqual } from 'node:crypto'
import { HMAC_ALGORITHM, HMAC_KEY, HMAC_DIGEST } from '@at/configs'

const sign = payload =>
  createHmac(HMAC_ALGORITHM, HMAC_KEY).update(payload).digest(HMAC_DIGEST)
const verify = (payload, signature) =>
  timingSafeEqual(Buffer.from(sign(payload)), Buffer.from(signature))

const txn = task => sign(JSON.stringify(task))

export const Signature = {
  sign,
  verify,
  txn
}
