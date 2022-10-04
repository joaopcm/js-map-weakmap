const assert = require('node:assert')

const myMap = new Map()

myMap
  .set(1, 'one')
  .set('João', { text: 'two' })
  .set(true, () => 'hello')

const myMapWithConstructor = new Map([
  [1, 'one'],
  ['João', { text: 'two' }],
  [true, () => 'hello']
])

// console.log(myMap.get(1))
assert.deepStrictEqual(myMap.get(1), 'one')
assert.deepStrictEqual(myMap.get('João'), { text: 'two' })
assert.deepStrictEqual(myMap.get(true)(), 'hello')

// in Objects, you can't use functions neither numbers as keys
const obj = { id: 1 }
myMap.set(obj, { name: 'João Melo' })

assert.deepStrictEqual(myMap.get({ id: 1 }), undefined)
assert.deepStrictEqual(myMap.get(obj), { name: 'João Melo' })

// utilitiy methods
// for Objects, it'd be Object.keys(obj).length
assert.deepStrictEqual(myMap.size, 4)

// for Objects, it'd be Object.hasOwnProperty() to check if it exists
assert.deepStrictEqual(myMap.has('João'), true)

// for Objects, it'd be delete obj.prop
myMap.delete('João')
assert.deepStrictEqual(myMap.has('João'), false)

// you can't iterate over Objects, it'd be required to transform it into an array
// with Object.entries(obj) and then iterate over it
assert.deepStrictEqual([...myMap.keys()], [1, true, obj])

// for (const [key, value] of myMap) {
//   console.log(key, value)
// }

// Object is insecure because depending on the key name, it can be overwritten
// ({ }).toString() => [object Object]
// ({ toString: () => 'hey' }).toString() => hey

const actor = {
  name: 'Xuxa da Silva',
  toString: 'Queen: Xuxa da Silva'
}

assert.ok(myMap.set(actor))
assert.throws(() => myMap.get(actor).toString, TypeError)
assert.deepStrictEqual(myMap.has(actor), true)

// in Objects, you can't clear it without creating a new one
myMap.clear()
assert.deepStrictEqual([...myMap.keys()], [])

// -- WeakMap
// used to avoid memory leaks
// it's not iterable
// only ref keys you already know

const weakMap = new WeakMap()
const hero = { name: 'Flash' }

weakMap.set(hero)
weakMap.get(hero)
weakMap.delete(hero)
weakMap.has(hero)