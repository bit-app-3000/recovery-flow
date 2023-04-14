import { nanoid } from 'nanoid'
import { Store } from '@at/store'

import { execute } from './fx.js'

const Registry = new Map()

export async function CommandController (req, res) {
  const { payload } = req.body
  const taskId = nanoid()

  Registry.set(taskId, res)
  await Store.set({ taskId, payload })
  execute({ taskId, command: 'isApproved' })
}

export const Result = ({ taskId, command, result }) => {
  switch (command) {
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

  const res = Registry.get(taskId)
  Registry.delete(taskId)
  res.json(result)
}
