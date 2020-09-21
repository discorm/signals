'use strict'

const Emitter = require('parallel-async-emitter')

function addSignals (Model) {
  const signals = new Emitter()

  Object.defineProperty(Model, 'signals', {
    value: signals
  })

  Model.prototype.emit = function emit (event, ...args) {
    return signals.emit(event, this, ...args)
  }

  return Model
}

function middleware () {
  this.driver = class SignalModel extends this.driver {
    static makeModel (...args) {
      const Model = super.makeModel(...args)
      addSignals(Model)
      return Model
    }
  }
}

module.exports = middleware
