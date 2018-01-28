process.env.NODE_ENV = 'test'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../src/server'

const knex = require('../src/server/db/connection')
const should = chai.should()
chai.use(chaiHttp)

describe('routes : auth', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
      .then(() => knex.migrate.latest())
      .then(() => knex.seed.run())
  })

  afterEach(() => knex.migrate.rollback())
})
