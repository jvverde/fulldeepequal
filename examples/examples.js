const isClone = require('../isClone')
const yargs = require('yargs');

const argv = yargs
  .option('debug', {
      alias: 'd',
      description: 'Show debug info',
      type: 'boolean',
  })
  .option('show', {
      alias: 's',
      description: 'Show values',
      type: 'boolean',
  })
  .help()
  .alias('help', 'h')
  .argv

const debug = !!argv.debug
let cnt = 1
const show = argv.show ? (...args) => args : () => ''
const assert = {
  eq: (x, y, a) => console.log(isClone(x, y, { ...a, debug }) ? 'OK' : 'FAIL', cnt++, show(x, 'eq', y)),
  ne: (x, y, a) => console.log(isClone(x, y, { ...a, debug }) ? 'FAIL' : 'OK', cnt++, show(x, 'ne', y))
}

assert.ne(null, undefined)
assert.eq(undefined, undefined)
assert.eq(null, null)
assert.eq(3/0, 3/0)
assert.eq(+"xpto", +"1 + 2")
assert.ne(3, 4)
assert.ne(3, new Number(3))
assert.eq(BigInt(321), 321n)
assert.ne(3, '3')
assert.ne(3, new Number(3))
assert.eq(new String('ab'), new String('ab'))
assert.ne(new String('ab'), 'ab')
assert.eq(new Boolean(true), new Boolean(true))
assert.eq(true, true)
const datea = new Date
const dateb = new Date(datea)
assert.eq(datea, dateb)
assert.ne(datea, new Date('December 17, 1995 03:24:00'))
const re = /^$/imsg
assert.eq(re, new RegExp(re))
assert.eq(/^$/igsm, /^$/imsg)
assert.ne(/^$/igsm, /^$/ims)
assert.ne(/^.$/, /^$/)
assert.eq([3, 2], [3, 2])
assert.ne([3, 2], [3, 2, 1])
assert.eq(new Int8Array([3, -3]), new Int8Array([3, -3]))
assert.ne(new Int8Array([3, -3]), new Int8Array([3, -3, 4]))
assert.eq(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, -3n]))
assert.ne(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, 0n]))
assert.eq(new Float64Array([Math.PI, Math.E, 1/3, Math.sqrt(2)]), new Float64Array([Math.PI, Math.E, 1/3, Math.sqrt(2)]))
const f = function() {}
const g = function() {}
assert.ne(f, g)
assert.eq(f, g, {strictly: false})
const x = { i: 1 }
const y = { i: 1 }
assert.eq(x, y)
function A (i) { this.i = i }
function B (i) { this.i = i }
assert.ne(A, B)
const a = new A(3)
assert.eq(a, new A(3))
assert.ne(a, new A(4))
const b = new B(3)
assert.ne(a, b)
const s = new Set([x, a])
assert.eq(s, new Set(s))
assert.eq(s, new Set([x, a]))
assert.ne(s, new Set([x, b]))
const m = new Map([[x, a], [y, a]])
assert.ne(m, new Map([[x, a], [y, b]]))

class C{}
assert.ne(C, A)
const c = new C()
assert.eq(c, new C())
class D extends C {}
assert.ne(D, C)
const d = new D()
assert.ne(d, c)
assert.eq(d, new D())

class E{
  constructor (i) { this.i = i }
  inc() { this.i++ }
}
const e = new E(0)
assert.eq(e, new E(0))
e.inc = function(){}
assert.ne(e, new E(0))

class DE{
  constructor (i) { this.e = new E(i) }
}
const de = new DE(0)
assert.eq(de, new DE(0))
assert.eq(new DE(c), new DE(c))
assert.eq(new DE(de), new DE(de))
assert.eq(new DE(m), new DE(m))

x.i = x
y.i = x
assert.eq(x, y)
x.i = x
y.i = y
assert.eq(x, y)
x.i = y
y.i = x
assert.eq(x, y)

const abc = new String('abc')
class STR extends String{
  constructor(s) {super(s)}
}
assert.eq(new STR('abc'), new STR('abc'))
assert.ne(new STR('abc'), abc)

abc.label = 'label'
assert.ne(abc, new String('abc'))

console.log(Object.entries(abc), abc.label)
console.log(abc.valueOf())

function getAllPropertyNames(obj) {
  const s = new Set()
  do {
      Object.getOwnPropertyNames(obj).forEach(p => { s.add(p) })
  } while (obj = Object.getPrototypeOf(obj))
  return [...s]
}
console.log(getAllPropertyNames(abc))
console.log(Object.keys(abc))
// function STRB(s){
//   String.call(this, s)
// }
// STRB.prototype = Object.create(String.prototype)
// STRB.prototype.append = function(s) {this.a = s}
// STRB.prototype.constructor = STRB
// const strb = new STRB('abc')
// const sw = new Set()
// sw.add({i:1})
// sw.add({i:1})
// console.log([...sw])
// console.log('------------------------')
// console.log(isIterable(stringa))
// console.log(stringa instanceof String)
// console.log(stringa.constructor.name)
// console.log(stringa.constructor === String)
// console.log(typeof stringa)
// console.log('------------------------')
// console.log(isIterable(stringb))
// console.log(stringb instanceof String)
// console.log(stringb.constructor.name)
// console.log(stringb.constructor === String)
// console.log(typeof stringb)
// console.log('------------------------')
// console.log(isIterable(str))
// console.log(str instanceof String)
// console.log(str.constructor.name)
// console.log(str.constructor === String)
// console.log(typeof str)
// console.log(str)
// console.log('------------------------')
// console.log(isIterable(strb))
// console.log(strb instanceof String)
// console.log(strb.constructor.name)
// console.log(strb.constructor === STRB)
// console.log(typeof strb)
// console.log(strb)
// console.log(getAllPropertyNames(s))
// console.log(s.valueOf())
// console.log(s.toString())
// console.log(getAllPropertyNames(m))
// console.log(getAllPropertyNames({}))
// console.log('++++++++++++++++++++++++')
// console.log(Object.getOwnPropertyNames(datea))
// console.log(datea.prototype)
// console.log(datea.constructor.prototype)
// console.log(Object.getPrototypeOf(datea))
// console.log('++++++++++++++++++++++++')
// console.log(Object.getOwnPropertyNames(b))
// console.log(b.prototype)
// console.log(b.constructor.prototype)
// console.log(Object.getPrototypeOf(b))
