// https:// developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/Inheritance

const isClone = require('../isClone')
const yargs = require('yargs')

const argv = yargs
  .option('debug', {
    alias: 'd',
    description: 'Show debug info',
    type: 'boolean'
  })
  .option('show', {
    alias: 's',
    description: 'Show values',
    type: 'boolean'
  })
  .help()
  .alias('help', 'h')
  .argv

const debug = !!argv.debug
let cnt = 1
const show = argv.show ? (...args) => args : () => ''
const assert = {
  eq: (x, y, a) => console.log(cnt++, isClone(x, y, { ...a, debug }) ? 'OK' : 'FAIL', show(x, 'eq', y)),
  ne: (x, y, a) => console.log(cnt++, isClone(x, y, { ...a, debug }) ? 'FAIL' : 'OK', show(x, 'ne', y))
}

// Primitive types
assert.ne(null, undefined)
assert.eq(undefined, undefined)
assert.eq(null, null)
assert.eq(3 / 0, 3 / 0)
assert.eq(+'xpto', +'1 + 2')
assert.ne(3, 4)
assert.eq(3, 3)
assert.eq('abc', 'abc')
assert.ne('abc', '')

// Primitive types and builtin objects
assert.ne(3, new Number(3))
assert.eq(BigInt(321), 321n)
assert.ne(3, '3')
assert.ne(3, new Number(3))
assert.eq(new String('ab'), new String('ab'))
assert.ne(new String('ab'), 'ab')
assert.eq(new Boolean(true), new Boolean(true))
assert.eq(true, true)
const now = new Date()
assert.eq(now, new Date(now))
assert.ne(now, new Date('December 17, 1995 03:24:00'))
const re = /^$/imsg
assert.eq(re, new RegExp(re))
assert.eq(/^$/igsm, /^$/sgmi)
assert.ne(/^$/igsm, /^$/im)
assert.ne(/^.$/, /^$/)

// Arrays
assert.eq([3, 2], [3, 2])
assert.ne([3, 2], [3, 2, 1])
assert.eq(new Array(5), new Array(5))
assert.eq(new Array(), [])
assert.ne(new Array(1), [undefined])
const ea = []
ea.length = 1
assert.eq(new Array(1), ea)

// Binary arrays
assert.eq(new Int8Array([3, -3]), new Int8Array([3, -3]))
assert.ne(new Int8Array([3, -3]), new Int8Array([3, -3, 4]))
assert.eq(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, -3n]))
assert.ne(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, 0n]))
assert.eq(new Float64Array([Math.PI, Math.E, 1 / 3, Math.sqrt(2)]), new Float64Array([Math.PI, Math.E, 1 / 3, Math.sqrt(2)]))

// Objects
assert.eq(new Object(), new Object())
assert.eq(new Object({ i: 1 }), new Object({ i: 1 }))
assert.ne(new Object({ j: 1 }), new Object({ i: 1 }))

// Literal Objects
assert.eq({}, {})
const x = { i: 1 }
const y = { i: 1 }
assert.eq(x, y)
assert.eq(x, new Object({ i: 1 }))

// Nest Objects
const z = { a: x }
const w = { a: y }
assert.eq(z, w)

// Object members
w.f = () => {}
assert.ne(z, w)

// User defined Objects
function Af (i) { this.i = i }
function Bf (i) { this.i = i }
assert.ne(Af, Bf)
const a = new Af(3)
assert.eq(a, new Af(3))
assert.ne(a, new Af(4))
const b = new Bf(3)
assert.ne(a, b)

// Sets
const s = new Set([x, a])
assert.eq(s, new Set(s))
assert.eq(s, new Set([x, a]))
assert.ne(s, new Set([x, b]))

const set = new Set([1, 2])
assert.eq(set, new Set([1, 2]))
set.label = 'label'
assert.ne(set, new Set([1, 2]))

// Maps
const m = new Map([[x, a], [y, a]])
assert.eq(m, new Map(m))
assert.eq(m, new Map([[x, a], [y, a]]))
assert.ne(m, new Map([[x, a], [y, b]]))

const map = new Map([[1, 2], [2, 3]])
assert.eq(map, new Map([[1, 2], [2, 3]]))
map.label = 'label'
assert.ne(map, new Map([[1, 2], [2, 3]]))


// Class instances
class C {}
assert.ne(C, A)
const c = new C()
assert.eq(c, new C())

// Inheritance
class D extends C {}
assert.ne(D, C)
const d = new D()
assert.ne(d, c)
assert.eq(d, new D())

// Changing an instance property
class E {
  constructor (i) { this.i = i }
  inc () { this.i++ }
}
const e = new E(0)
assert.eq(e, new E(0))
e.inc = function () {}
assert.ne(e, new E(0))

// Nested objects in class instances
class DE {
  constructor (i) { this.e = new E(i) }
}
const de = new DE(0)
assert.eq(de, new DE(0))
assert.eq(new DE(c), new DE(c))
assert.eq(new DE(de), new DE(de))
assert.eq(new DE(m), new DE(m))
de.x = 'x'
assert.ne(de, new DE(0))

// Circular references
x.i = x
y.i = x
assert.eq(x, y)
x.i = x
y.i = y
assert.eq(x, y)
x.i = y
y.i = x
assert.eq(x, y)


// Strictly

// By default two function are equal if and only if they both refere to same code/object)
const f = function () {}
const g = function () {}
assert.ne(f, g)
assert.eq(f, g, { strictly: false })

const C1 = class {}
const C2 = class {}
assert.ne(C1, C2)
assert.eq(C1, C2, { strictly: false }) // Constructores are distinct but are string (C1.toString() === C2.toString())
const c1 = new C1()
const c2 = new C2()
assert.ne(c1, c2)
assert.eq(c1, c2, { strictly: false })

class C3 {}
const c3 = new C3()
assert.ne(c1, c3, { strictly: true })
assert.ne(c1, c3, { strictly: false }) // the constructors are different

const C4 = class {
  // note
}
const c4 = new C4()
assert.ne(c1, c4, { strictly: false }) // the constructors are "stringly" different

const F1 = function (i) { this.i = i }
const F2 = function (i) { this.i = i }
assert.ne(F1, F2)
assert.eq(F1, F2, { strictly: false })
const f1 = new F1(3)
const f2 = new F2(3)
assert.ne(f1, f2)
assert.eq(f1, f2, { strictly: false })

// Subclasses of builtin types
const abc = new String('abc')
class STR extends String {}
assert.eq(new STR('abc'), new STR('abc'))
assert.ne(new STR('abc'), abc)

abc.label = 'label'
assert.ne(abc, new String('abc'))

const one = new Number(1)
one.label = 'label'
assert.ne(one, new Number(1))

const bool = new Boolean(true)
bool.label = 'label'
assert.ne(bool, new Boolean(true))

const d1st = new Date('December 1, 1995 00:00:00')
assert.eq(d1st, new Date('December 1, 1995 00:00:00'))
d1st.label = 'label'
assert.ne(d1st, new Date('December 1, 1995 00:00:00'))

const regexp = /^.+$/imsg
assert.eq(regexp, /^.+$/imsg)
regexp.label = 'label'
assert.ne(regexp, /^.+$/imsg)

const array = [1, 2]
assert.eq(array, [1, 2])
array.label = 'label'
assert.ne(array, [1, 2])

class Vector extends Array {}
assert.eq(new Vector(3), new Vector(3))
assert.ne(new Vector(3), new Array(3))

// Prototype inheritance
function A (n = 1) { this.n = n }
A.prototype.inc = function (n) { this.n += n }
const obja = new A(1)
assert.eq(obja, new A(1))
assert.ne(obja, new A(2))

function B (n = 1) { A.call(this, n) }
assert.ne(obja, new B(1))
B.prototype = Object.create(A.prototype)
assert.ne(obja, new B(1))
B.prototype.dec = function (n) { this.inc(-n) }
B.prototype.constructor = B

assert.ne(A, B)
const objb = new B(1)
assert.eq(objb, new B(1))
assert.ne(objb, obja)
objb.inc = () => {}
assert.ne(objb, new B(1))

// Other cases

class Int extends Number {
  constructor (i = 0) {
    super(i)
    this.sqr = this * this
  }
  get osqr() { return this.sqr }
}

assert.eq(new Int(3), new Int(3))

class Long extends Int {}

assert.eq(new Long(1), new Long(1))
assert.ne(new Long(1), new Long(2))

const makeArrowFunction = () => (a) => a + a
assert.eq(makeArrowFunction(), makeArrowFunction())

const makeFunction = () => {
  return function (a) { return a + a }
}
assert.ne(makeFunction(), makeFunction())
assert.eq(makeFunction(), makeFunction(), { strictly: false })

const makeClassA = () => class A{}
const [A1, A2] = [makeClassA(), makeClassA()]
assert.ne(new A1(), new A2())
assert.eq(new A1(), new A2(), { strictly: false })

const makeClass = () => class {}
const [B1, B2] = [makeClass(), makeClass()]
assert.ne(new B1(), new B2())
assert.eq(new B1(), new B2(), { strictly: false })

class Myset extends Set{
  constructor(v, date = 'December 1, 1995 00:00:00') {
    super(v)
    this.date = date
  }
}

assert.eq(new Myset(), new Myset())

const makeSet = (date) => {
  return class extends Set {
    constructor(v) {
      super(v)
      this.date = date
    }
  }
}
const [DS1, DS2] = [makeSet('December 1, 1995 00:00:00'), makeSet('December 1, 1995 00:00:00')]
assert.ne(new DS1(), new DS2())
assert.eq(new DS1(), new DS2(), { strictly: false })
assert.eq(new DS1([1,2]), new DS2([1,2]), { strictly: false })
assert.eq(new DS1([1,2, new DS2()]), new DS2([1,2, new DS1()]), { strictly: false })

function clone(obj) {
  const props = Object.getOwnPropertyDescriptors(obj)
  const proto = Object.getPrototypeOf(obj)
  return Object.create(proto, props)
}

const o1 = Object.create(null)
const o2 = clone(o1)
assert.eq(o1, o2)
