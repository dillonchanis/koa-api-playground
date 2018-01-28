import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import session from 'koa-session'
import passport from 'koa-passport'
import { config as envConfig } from 'dotenv'
import indexRoutes from './routes'
import bookRoutes from './routes/books'

envConfig()

const app = new Koa()
const PORT = process.env.PORT || 3030

app.keys = [process.env.APP_SECRET]

app.use(session(app))
app.use(bodyParser())

require('./auth')
app.use(passport.initialize())
app.use(passport.session())

app.use(indexRoutes.routes())
app.use(bookRoutes.routes())

export const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
