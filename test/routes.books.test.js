process.env.NODE_ENV = 'test'

import chai from 'chai'
import chaiHttp from 'chai-http'
import { server } from '../src/server'

const knex = require('../src/server/db/connection')
const should = chai.should()
chai.use(chaiHttp)

describe('routes : movies', () => {
  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => knex.migrate.latest())
    .then(() => knex.seed.run())
  })

  afterEach(() => knex.migrate.rollback())

  describe('GET /api/v1/books', () => {
    it('should return all books', (done) => {
      chai.request(server)
        .get('/api/v1/books')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.status.should.eql('success')
          res.body.data.length.should.eql(4)
          res.body.data[0].should.include.keys(
            'id', 'name', 'author', 'genre', 'rating'
          )
          done()
        })
    })
  })

  describe('GET /api/v1/books/:id', () => {
    it('should return a single book', (done) => {
      chai.request(server)
        .get('/api/v1/books/1')
        .end((err, res) => {
          should.not.exist(err)
          res.status.should.equal(200)
          res.type.should.equal('application/json')
          res.body.status.should.eql('success')
          res.body.data[0].should.include.keys(
            'id', 'name', 'author', 'genre', 'rating'
          )
          done()
        })
    })

    it('should return an error if no book exists', (done) => {
      chai.request(server)
        .get('/api/v1/books/1000000000000')
        .end((err, res) => {
          should.exist(err)
          res.status.should.equal(404)
          res.type.should.equal('application/json')
          res.body.status.should.eql('error')
          res.body.message.should.eql('That book does not exist.')
          done()
        })
    })
  })

})


