# @disco/signals

[![CI status](https://github.com/discorm/signals/workflows/ci/badge.svg)](https://github.com/discorm/signals/actions?query=workflow%3Aci+branch%3Amaster)
[![Coverage Status](https://coveralls.io/repos/discorm/signals/badge.png)](https://coveralls.io/r/discorm/signals)
[![npm package](https://img.shields.io/npm/v/@disco/signals)](https://npmjs.com/package/@disco/signals)
[![Dependencies](https://img.shields.io/david/discorm/signals)](https://david-dm.org/discorm/signals)
[![MIT License](https://img.shields.io/npm/l/@disco/signals)](./LICENSE)


This is a middleware for disco to add a signal emitter to
each model class which allows monitoring lifecycle events.

## Install

```sh
npm install @disco/signals
```

## Usage

```js
const disco = require('@disco/disco')
const signals = require('@disco/signals')

const modeller = disco(driver)
modeller.use(signals)

const User = modeller.createModel('user')

// Remember to hash your passwords!
User.signals.on('validate', user => {
  const { password } = user
  user.hash = hash(password)
  delete user.password
})
```
