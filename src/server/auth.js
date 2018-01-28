import passport from 'koa-passport'
import knex from './db/connection'

const LocalStrategy = require('passport-local').Strategy

const options = {}

passport.serializeUser((user, done) => done(null, user.id))

passport.deserializeUser((id, done) => {
  return knex('users').where({ id }).first()
    .then((user) => done(null, user))
    .catch((err) => done(err, null))
})

passport.use(new LocalStrategy(options, (username, password, done) => {
  knex('users').where({ username }).first()
    .then((user) => {
      if (!user) return done(null, false)

      if (password === user.password) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    .catch((err) => done(err))
}))
