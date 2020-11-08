const isEqual = require('./isEqual')

const debug = true
const assert = {
  same: (x, y) => console.log(isEqual(x, y, { debug }) ? 'OK' : 'FAIL'),
  diff: (x, y) => console.log(isEqual(x, y, { debug }) ? 'FAIL' : 'OK')
}

let tab = 1
console.log('------------------------', tab++)
assert.diff(null, undefined)

console.log('------------------------', tab++)
assert.same(undefined, undefined)

console.log('------------------------', tab++)
assert.same(null, null)

console.log('------------------------', tab++)
assert.same(3/0, 3/0)

console.log('------------------------', tab++)
assert.same(+"xpto", +"1 + 2")

console.log('------------------------', tab++)
const x = { i: 1 }
const y = { i: 1 }
assert.same(x, y)

console.log('------------------------', tab++)
function A (i) { this.i = i }
function B (i) { this.i = i }
const a = new A(3)
const b = new B(3)
assert.diff(a, b)

console.log('------------------------', tab++)
const s = new Set([x, a])
const r = new Set([x, b])
assert.diff(s, r)
console.log('------------------------', tab++)
const m = new Map([[x, a], [y, a]])
const n = new Map([[x, a], [y, b]])
assert.diff(m, n)

console.log('------------------------', tab++)
const arraya = new Array(3, 2, 1, {a: s})
const arrayb = new Array(3, 2, 1, {a: m})
assert.diff(arraya, arrayb)

console.log('------------------------', tab++)
const datea = new Date
const dateb = new Date(datea)
assert.same(datea, dateb)

console.log('------------------------', tab++)
const datec = new Date('December 17, 1995 03:24:00')
assert.diff(datea, datec)

console.log('------------------------', tab++)
assert.diff(3, 4)

console.log('------------------------', tab++)
assert.diff(3, new Number(3))

console.log('------------------------', tab++)
const re = /^$/imsg
assert.same(/^$/igsm, new RegExp(re))

console.log('------------------------', tab++)
const bint = BigInt(321)
assert.same(bint, 321n)

console.log('------------------------', tab++)
assert.diff(3, '3')

console.log('------------------------', tab++)
assert.diff(3, new Number(3))

console.log('------------------------', tab++)
assert.same(new Int8Array([3, -3]), new Int8Array([3, -3]))

console.log('------------------------', tab++)
assert.diff(new Int8Array([3, -3]), new Int8Array([3, -3, 4]))

console.log('------------------------', tab++)
assert.same(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, -3n]))

console.log('------------------------', tab++)
assert.diff(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, 0n]))

console.log('------------------------', tab++)
assert.same(new Float64Array([Math.PI, Math.E, 1/3, Math.sqrt(2)]), new Float64Array([Math.PI, Math.E, 1/3, Math.sqrt(2)]))

console.log('------------------------', tab++)
assert.same([Math.PI, Math.E], [Math.PI, Math.E])

console.log('------------------------', tab++)
const stringa = new String('ab')
assert.same(stringa, new String('ab'))

console.log('------------------------', tab++)
assert.diff(stringa, 'ab')

console.log('------------------------', tab++)
assert.same(new Boolean(true), new Boolean(true))

console.log('------------------------', tab++)
assert.same(true, true)

const stringb = 'ab'
class STR extends String{
  constructor(s) {super(s)}
}
const str = new STR('abc')
function STRB(s){
  String.call(this, s)
}
STRB.prototype = Object.create(String.prototype)
STRB.prototype.append = function(s) {this.a = s}
STRB.prototype.constructor = STRB

const strb = new STRB('abc')

const sw = new Set()
sw.add({i:1})
sw.add({i:1})
console.log([...sw])
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

