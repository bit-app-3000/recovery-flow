import { inspect } from 'node:util'
import fastify from 'fastify'
import { Info } from '@at/configs'

inspect.defaultOptions = { depth: null }

const SERVER_OPTS = {
  ignoreTrailingSlash: true,
  disableRequestLogging: false,
  caseSensitive: true
}

function Server (opts) {
  return fastify(Object.assign({}, opts, SERVER_OPTS))
}

const Listener = svc => (err, address) => {
  return err
    ? process.exit(1)
    : Info(svc)
}

async function NotFound (f) {
  f.setNotFoundHandler((req, reply) =>
    reply
      .code(404)
      .send({ reason: 'Oops! That page can’t be found!' }))
}

export { Listener, Server, NotFound }
