export const compose = (...fns) => x => fns.reduceRight((g, f) => f(g), x)
export const composeAsync = (...fns) => x => fns.reduceRight((f, g) => f.then(g), Promise.resolve(x))
export const either = (c, l, r) => a => c(a) ? l(a) : r(a)
export const pipe = (...fns) => compose.apply(null, fns.reverse())
