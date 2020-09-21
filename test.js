'use strict'

const disco = require('@disco/disco')
const tap = require('tap')

const signals = require('./')

tap.test('basics', t => {
  class Data {
    constructor (data) {
      this.set(data)
    }

    set (key, value) {
      if (typeof key === 'object') {
        for (const [k, v] of Object.entries(key)) {
          this.set(k, v)
        }
        return
      }

      this[key] = value
      this.emit(key, value)
    }

    static makeModel (name) {
      class Model extends this {}
      Object.defineProperty(Model, 'tableName', {
        value: name
      })
      return Model
    }
  }

  const modeller = disco(Data)
  modeller.use(signals)

  const DataEmitter = modeller.createModel('data-emitter')
  const expected = ['first', 'second']
  const seen = []

  DataEmitter.signals.on('name', (instance, value) => {
    const name = expected.shift()
    t.comment(name)
    t.equal(value, name, 'value matches')
    t.equal(instance.name, name, 'instance name matches')
    seen.push(instance)
  })

  const first = new DataEmitter({ name: 'first' })
  const second = new DataEmitter({ name: 'second' })

  t.comment('seen')
  t.equal(seen.length, 2, 'saw two "name" assignment events')
  t.deepEqual(seen, [first, second], 'saw all constructed instances')
  t.end()
})
