import Koa from 'koa'
import { config as envConfig } from 'dotenv'
import indexRoutes from './routes'

envConfig()

const app = new Koa()
const PORT = process.env.PORT || 3030

app.use(indexRoutes.routes())

export const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
