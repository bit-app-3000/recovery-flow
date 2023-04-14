export const clone = obj => JSON.parse(JSON.stringify(obj))
export const rndInt = (min, max) => Math.floor(min + Math.random() * (max + 1 - min))
export const NO_OP = () => {}

export const delay = ms =>
  new Promise(resolve =>
    setTimeout(resolve, ms))

export const timeOut = (ms = 100) =>
  new Promise(resolve =>
    setTimeout(resolve, ms, 'timeOut'))
