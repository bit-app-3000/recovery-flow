import dotenv from 'dotenv'
const path = process.env.INIT_CWD ? '../../.env' : '../../../.env'
dotenv.config({ path })
