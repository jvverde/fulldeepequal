const isEqual = require('../isEqual')
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
  same: (x, y, a) => console.log(isEqual(x, y, { ...a, debug }) ? 'OK' : 'FAIL', cnt++, show(x, 'eq', y)),
  diff: (x, y, a) => console.log(isEqual(x, y, { ...a, debug }) ? 'FAIL' : 'OK', cnt++, show(x, 'ne', y))
}

assert.diff(null, undefined)
assert.same(undefined, undefined)
assert.same(null, null)
assert.same(3/0, 3/0)
assert.same(+"xpto", +"1 + 2")
assert.diff(3, 4)
assert.diff(3, new Number(3))
assert.same(BigInt(321), 321n)
assert.diff(3, '3')
assert.diff(3, new Number(3))
assert.same(new String('ab'), new String('ab'))
assert.diff(new String('ab'), 'ab')
assert.same(new Boolean(true), new Boolean(true))
assert.same(true, true)
const datea = new Date
const dateb = new Date(datea)
assert.same(datea, dateb)
assert.diff(datea, new Date('December 17, 1995 03:24:00'))
const re = /^$/imsg
assert.same(re, new RegExp(re))
assert.same(/^$/igsm, /^$/imsg)
assert.diff(/^$/igsm, /^$/ims)
assert.diff(/^.$/, /^$/)
assert.same([3, 2], [3, 2])
assert.diff([3, 2], [3, 2, 1])
assert.same(new Int8Array([3, -3]), new Int8Array([3, -3]))
assert.diff(new Int8Array([3, -3]), new Int8Array([3, -3, 4]))
assert.same(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, -3n]))
assert.diff(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, 0n]))
assert.same(new Float64Array([Math.PI, Math.E, 1/3, Math.sqrt(2)]), new Float64Array([Math.PI, Math.E, 1/3, Math.sqrt(2)]))
const f = function() {}
const g = function() {}
assert.diff(f, g)
assert.same(f, g, {strictly: false})
const x = { i: 1 }
const y = { i: 1 }
assert.same(x, y)
function A (i) { this.i = i }
function B (i) { this.i = i }
assert.diff(A, B)
const a = new A(3)
const b = new B(3)
assert.diff(a, b)
const s = new Set([x, a])
const r = new Set([x, b])
assert.diff(s, r)
const m = new Map([[x, a], [y, a]])
const n = new Map([[x, a], [y, b]])
assert.diff(m, n)
const arraya = new Array(3, 2, 1, {a: s})
const arrayb = new Array(3, 2, 1, {a: m})
assert.diff(arraya, arrayb)
// const stringb = 'ab'
// class STR extends String{
//   constructor(s) {super(s)}
// }
// const str = new STR('abc')
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
