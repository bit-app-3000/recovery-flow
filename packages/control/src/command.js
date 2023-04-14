import cannon from 'autocannon'

const opts = {
  url: 'http://127.0.0.1:9191',
  connections: 50,
  pipelining: 1,
  duration: 10,
  timeout: 600,
  workers: 10,
  idReplacement: true,
  requests: [
    {
      method: 'POST',
      path: '/command',
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({ payload: '[<id>]' })
    }
  ]
}

const instance = cannon(opts)

cannon.track(instance, { renderProgressBar: true })
