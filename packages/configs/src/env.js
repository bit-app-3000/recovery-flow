import { customAlphabet } from 'nanoid'
import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const packageJson = require('../../../package.json')

const buildId = customAlphabet('1234567890abcdef', 4)

// ENV
export const VERSION = packageJson.version
export const BUILD = buildId()

// APP
export const { SHUTDOWN_DELAY } = process.env
export const LOCAL_HOST = '127.0.0.1'

// DELAY FLOW STEPS
export const { DELAY_IS_APPROVED, DELAY_APPROVE, DELAY_SIGN, DELAY_SEND } = process.env

// CRYPTO
export const { HMAC_ALGORITHM, HMAC_KEY, HMAC_DIGEST } = process.env

// NATS
export const { NATS_HOST } = process.env

export const JS = {
  EXECUTE: 'execute',
  RESULT: 'result'
}

export const DURABLE =
  Object
    .entries(JS)
    .reduce((a, [k, v]) => {
      a[v] = k
      return a
    }, {})

export const KV_NAME = 'TASKS'
export const KV_OPTS = { history: 1 }
