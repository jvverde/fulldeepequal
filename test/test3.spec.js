const isEqual = require('../isEqual')
const { random, date } = require('faker')

describe('Test objects', () => {
  describe('Simple object (All different)', () => {
    const values = [
      {},
      {i: 1},
      {i: 2},
      {j: 1},
      {j: 2},
      {i: 1, j:2}
    ]
    describe('A value must be equal itself', () => {
      for(const v of values) {
        test(`${Object.entries(v)} should be equal to ${Object.entries(v)}`, () => {
          const res = isEqual(v, v)
          expect(res).toBe(true)
        })
      }
    })
    describe('A value must be different of each other', () => {
      for(const v of values) {
        const s = new Set(values)
        s.delete(v)
        for(const w of s) {
          test(`${Object.entries(v)} should NOT be equal to ${Object.entries(w)}`, () => {
            const res = isEqual(v, w)
            expect(res).toBe(false)
          })
        }
      }
    })
  })
  describe('Simple object (All equals)', () => {
    const n = random.number()
    const s = random.words()
    const values = [
      [{}, {}],
      [{i: n}, {i: n}],
      [{i: n, j: s}, {i: n, j: s}],
    ]
    describe('A value must be equal to any other with same properties', () => {
      for(const v of values) {
        test(`${Object.entries(v[0])} should be equal to ${Object.entries(v[1])}`, () => {
          const res = isEqual(v[0], v[1])
          expect(res).toBe(true)
        })
      }
    })
  })
})