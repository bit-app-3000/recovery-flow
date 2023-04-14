import { SVC } from '@at/configs'
import { compose } from '@at/utils'

import { jsonServer } from './server.js'
import { effects } from './fx.js'

const svc = SVC.svcA

compose(jsonServer, effects)(svc)
