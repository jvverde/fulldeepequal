const isClone = require('../isClone')
const { random } = require('faker')

describe('Strictly vs not strictly', () => {
  const n = random.number()
  const s = random.words(10)
  describe('Different objects, but similar toString() result', () => {
    class A{}
    class B{}
    const values = [
      [{ f: function () {} }, { f: function () {} }],
      [new A(), new B()]
    ]
    for (const v of values) {
      test(`${Object.entries(v[0])} should be (not strictly) equal to ${Object.entries(v[1])}`, () => {
        const nok = isClone(v[0], v[1])
        expect(nok).toBe(false)
        const ok = isClone(v[0], v[1], { strictly: false })
        expect(ok).toBe(true)
      })
    }
  })
})
