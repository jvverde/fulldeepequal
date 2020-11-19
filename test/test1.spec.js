const isClone = require('../isClone')
const { random, date } = require('faker')

describe('Test objects equality', () => {
  describe('Test basic types', () => {
    const values = [
      undefined,
      null,
      +'NaN',
      3 / 0,
      Infinity,
      Date,
      BigInt,
      Array,
      Object,
      Set,
      Map,
      RegExp,
      Promise,
      random.number(),
      random.alphaNumeric(30),
      random.boolean(),
      random.float(),
      date.recent()
    ]
    describe('A value must be equal itself', () => {
      for (const v of values) {
        test(`${v} should be equal to ${v}`, () => {
          const res = isClone(v, v)
          expect(res).toBe(true)
        })
      }
    })
    describe('A value must not be any other type', () => {
      for (const v of values) {
        const s = new Set(values)
        s.delete(v) // remove itself
        for (const w of s) {
          test(`${v} should NOT be equal to ${w}`, () => {
            const res = isClone(v, w)
            expect(res).toBe(false)
          })
        }
      }
    })
  })
})
