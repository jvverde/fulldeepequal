const isClone = require('../isClone')
const { random } = require('faker')

describe('Strictly vs not strictly', () => {
  const n = random.number()
  const s = random.words(10)
  describe('Different objects, but similar toString() values', () => {
    const makeFunction = () => function (a) {return a + a }
    const makeClassA = () => class A{}
    const makeClass = () => class {}
    const [A1, A2] = [makeClassA(), makeClassA()]
    const [B1, B2] = [makeClass(), makeClass()]
    const values = [
      [makeFunction(), makeFunction()],
      [new A1(), new A2()],
      [new B1(), new B2()]
    ]
    for (const v of values) {
      test(`${v[0]} and ${v[1]} should be strictly not equal, but equal if when strictly === false`, () => {
        const nok = isClone(v[0], v[1])
        expect(nok).toBe(false)
        const ok = isClone(v[0], v[1], { strictly: false })
        expect(ok).toBe(true)
      })
    }
  })
})
