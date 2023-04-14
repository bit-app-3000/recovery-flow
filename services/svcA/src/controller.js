import { nanoid } from 'nanoid'
import { execute, down$ } from './fx.js'

import { Stat } from '@at/sinks'

const stat = await Stat({ name: 'svc:A', metric: ['execute', 'result', 'reply'], down$ })

const Registry = new Map()

export const CommandController = (req, reply) => {
  const { payload } = req.body
  const taskId = nanoid()
  Registry.set(taskId, reply)
  execute({ taskId, payload, command: 'create' })
  stat('execute')
}

export const Result = ({ taskId, command, result }) => {
  stat('result')
  switch (command) {
    case 'create':
      return execute({ taskId, command: 'isApproved' })
    case 'isApproved':
      return result
        ? execute({ taskId, command: 'sign' })
        : execute({ taskId, command: 'approve' })
    case 'approve':
      return execute({ taskId, command: 'sign' })
    case 'sign':
      return execute({ taskId, command: 'send' })
    case 'send':
      return Reply({ taskId, result })
  }
}

export function Reply ({ taskId, result }) {
  if (!Registry.has(taskId)) return
  const reply = Registry.get(taskId)
  Registry.delete(taskId)

  reply
    .code(200)
    .send(result)

  stat('reply')
}
