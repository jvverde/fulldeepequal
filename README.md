# isClone
Deep compare two objects/values and return true if one is a clone of other

## Setup

**1. Install**

```shell
npm install isclone
```

## Usage

```javascript
const isClone = require('isClone')
//Primitive types
isClone(null, undefined)  // FALSE
isClone(undefined, undefined)  // TRUE
isClone(null, null)  // TRUE
isClone(3/0, 3/0)  // TRUE
isClone(+"xpto", +"1 + 2")  // TRUE
isClone(3, 4)  // FALSE
isClone(3, 3)  // TRUE
isClone('abc', 'abc')  // TRUE
isClone('abc', '')  // FALSE

//Primitive types and builtin objects
isClone(3, new Number(3))  // FALSE
isClone(BigInt(321), 321n)  // TRUE
isClone(3, '3')  // FALSE
isClone(3, new Number(3))  // FALSE
isClone(new String('ab'), new String('ab'))  // TRUE
isClone(new String('ab'), 'ab')  // FALSE
isClone(new Boolean(true), new Boolean(true))  // TRUE
isClone(true, true)  // TRUE
const now = new Date
isClone(now, new Date(now))  // TRUE
isClone(now, new Date('December 17, 1995 03:24:00'))  // FALSE
const re = /^$/imsg
isClone(re, new RegExp(re))  // TRUE
isClone(/^$/igsm, /^$/sgmi)  // TRUE
isClone(/^$/igsm, /^$/im)  // FALSE
isClone(/^.$/, /^$/)  // FALSE

//Arays and binary arrays
isClone([3, 2], [3, 2])  // TRUE
isClone([3, 2], [3, 2, 1])  // FALSE
isClone(new Int8Array([3, -3]), new Int8Array([3, -3]))  // TRUE
isClone(new Int8Array([3, -3]), new Int8Array([3, -3, 4]))  // FALSE
isClone(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, -3n]))  // TRUE
isClone(new BigInt64Array([3n, -3n]), new BigInt64Array([3n, 0n]))  // FALSE
isClone(new Float64Array([Math.PI, Math.E, 1/3, Math.sqrt(2)]), new Float64Array([Math.PI, Math.E, 1/3, Math.sqrt(2)]))  // TRUE

// Functions (by default two function are equal if and only if they both refere to same code/object)
const f = function() {}
const g = function() {}
isClone(f, g)  // FALSE
isClone(f, g, {strictly: false})  // TRUE

//Literal Objects
const x = { i: 1 }
const y = { i: 1 }
isClone(x, y)  // TRUE

//Nest Objects
const z = { a: x }
const w = { a: y }
isClone(z, w)  // TRUE

//Object members
w.f = () => {}
isClone(z, w)  // FALSE

//User defined Objects
function A (i) { this.i = i }
function B (i) { this.i = i }
isClone(A, B)  // FALSE
const a = new A(3)
isClone(a, new A(3))  // TRUE
isClone(a, new A(4))  // FALSE
const b = new B(3)
isClone(a, b)  // FALSE

//Sets
const s = new Set([x, a])
isClone(s, new Set(s))  // TRUE
isClone(s, new Set([x, a]))  // TRUE
isClone(s, new Set([x, b]))  // FALSE

//Maps
const m = new Map([[x, a], [y, a]])
isClone(m, new Map([[x, a], [y, b]]))  // FALSE

// Class instances
class C{}
isClone(C, A)  // FALSE
const c = new C()
isClone(c, new C())  // TRUE

// Inheritance
class D extends C {}
isClone(D, C)  // FALSE
const d = new D()
isClone(d, c)  // FALSE
isClone(d, new D())  // TRUE

// Changing an instance property
class E{
  constructor (i) { this.i = i }
  inc() { this.i++ }
}
const e = new E(0)
isClone(e, new E(0))  // TRUE
e.inc = function(){}
isClone(e, new E(0))  // FALSE

// Nested objects
class DE{
  constructor (i) { this.e = new E(i) }
}
const de = new DE(0)
isClone(de, new DE(0))  // TRUE
isClone(new DE(c), new DE(c))  // TRUE
isClone(new DE(de), new DE(de))  // TRUE
isClone(new DE(m), new DE(m))  // TRUE
de.x = 'x'
isClone(de, new DE(0))  // FALSE

// Circular references
x.i = x
y.i = x
isClone(x, y)  // TRUE
x.i = x
y.i = y
isClone(x, y)  // TRUE
x.i = y
y.i = x
isClone(x, y)  // TRUE

// Subclasses of builtin types
const abc = new String('abc')
class STR extends String{
  constructor(s) {super(s)}
}
isClone(new STR('abc'), new STR('abc'))  // TRUE
isClone(new STR('abc'), abc)  // FALSE

abc.label = 'label'
isClone(abc, new String('abc'))  // FALSE

const one = new Number(1)
one.label = 'label'
isClone(one, new Number(1))  // FALSE

const bool = new Boolean(true)
bool.label = 'label'
isClone(bool, new Boolean(true))  // FALSE

const d1st = new Date('December 1, 1995 00:00:00')
isClone(d1st, new Date('December 1, 1995 00:00:00'))  // TRUE
d1st.label = 'label'
isClone(d1st, new Date('December 1, 1995 00:00:00'))  // FALSE

const regexp = /^.+$/imsg
isClone(regexp, /^.+$/imsg)  // TRUE
regexp.label = 'label'
isClone(regexp, /^.+$/imsg)  // FALSE


const array = [1, 2]
isClone(array, [1, 2])  // TRUE
array.label = 'label'
isClone(array, [1, 2])  // FALSE

class Vector extends Array{
  constructor(s) {super(s)}
}
isClone(new Vector(3), new Vector(3))  // TRUE
isClone(new Vector(3), new Array(3))  // FALSE

const set = new Set([1, 2])
isClone(set, new Set([1, 2]))  // TRUE
set.label = 'label'
isClone(set, new Set([1, 2]))  // FALSE

const map = new Map([[1, 2], [2,3]])
isClone(map, new Map([[1, 2], [2,3]]))  // TRUE
map.label = 'label'
isClone(map, new Map([[1, 2], [2,3]]))  // FALSE

// Prototype inheritance
function A(n = 1) { this.n = n }
A.prototype.inc = function(n) { this.n += n }
const obja = new A(1)
isClone(obja, new A(1))  // TRUE
isClone(obja, new A(2))  // FALSE

function B(n = 1) { A.call(this, n) }
isClone(obja, new B(1))  // FALSE
B.prototype = Object.create(A.prototype)
isClone(obja, new B(1))  // FALSE
B.prototype.dec = function(n) { this.inc(-n); }
B.prototype.constructor = B

isClone(A, B)  // FALSE
const objb = new B(1)
isClone(objb, new B(1))  // TRUE
isClone(objb, obja)  // FALSE
objb.inc = () => {}
isClone(objb, new B(1))  // FALSE
```

