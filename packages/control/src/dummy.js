// import '@at/control/env'
import { nanoid } from 'nanoid'
import { randomUUID } from 'node:crypto'

const command = () => {
  return {
    taskId: nanoid(), payload: randomUUID()
  }
}

const execute = () => {
  return {
    taskId: nanoid(), command: 'approve'
  }
}

const result = () => {
  return {
    taskId: nanoid(), result: false
  }
}

export const Dummy = {
  command, execute, result
}
