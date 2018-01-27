import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { config as envConfig } from 'dotenv'
import indexRoutes from './routes'
import bookRoutes from './routes/books'

envConfig()

const app = new Koa()
const PORT = process.env.PORT || 3030

app.use(bodyParser())
app.use(indexRoutes.routes())
app.use(bookRoutes.routes())

export const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
