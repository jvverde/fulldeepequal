const isClone = require('../isClone')
const { random, date } = require('faker')

describe('Test builtin objects', () => {
  const number = random.number()
  const string = random.words()
  const bool = random.boolean()
  const float = random.float()
  describe('Test basic types', () => {
    const values = [
      [ number, 1 + number],
      [ string, '0' + string],
      [ bool, !bool],
      [ float, 1.2 * float ]
    ]
    for(const v of values) {
      test(`${v[0]} should NOT be equal to ${v[1]}`, () => {
        const res = isClone(...v)
        expect(res).toBe(false)
      })
    }
  })
  describe('Test primitives against builtin objects', () => {
    const values = [
      [ number, new Number(number)],
      [ string, new String(string)],
      [ bool, new Boolean(bool)]
    ]
    for(const v of values) {
      test(`${v[0]} should NOT be equal to ${v[1].constructor.name}(${v[1]})`, () => {
        const res = isClone(...v)
        expect(res).toBe(false)
      })
    }
  })
  describe('Test builtin objects equality', () => {
    const recent = new Date(date.past())
    const bint = BigInt(random.hexaDecimal(20))
    const values = [
      [ new Number(number), new Number(number)],
      [ new String(string), new String(string)],
      [ new Boolean(bool), new Boolean(bool)],
      [ recent, recent],
      [ bint, bint]
    ]
    for(const v of values) {
      test(`${v[0].constructor.name}(${v[0]}) should be equal to ${v[1].constructor.name}(${v[1]})`, () => {
        const res = isClone(...v)
        expect(res).toBe(true)
      })
    }
  })
  describe('Test builtin objects inequality', () => {
    const bint = BigInt(random.hexaDecimal(20))
    const values = [
      [ new Number(number), new Number(1 + number)],
      [ new String(string), new String('a' + string)],
      [ new Boolean(bool), new Boolean(!bool)],
      [ new Date(date.past()), new Date(date.future())],
      [ bint, bint * bint + 1n]
    ]
    for(const v of values) {
      test(`${v[0].constructor.name}(${v[0]}) should NOT be equal to ${v[1].constructor.name}(${v[1]})`, () => {
        const res = isClone(...v)
        expect(res).toBe(false)
      })
    }
  })
})