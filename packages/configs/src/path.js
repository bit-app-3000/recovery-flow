import { resolve } from 'node:path'
import { existsSync, mkdirSync } from 'node:fs'

const DATA = resolve('..', '..', 'data')

!existsSync(DATA) && mkdirSync(DATA)

export const PATH_DB = resolve(DATA, 'db.json')
