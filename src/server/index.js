import Koa from 'koa'
import { config as envConfig } from 'dotenv'

envConfig()

const app = new Koa()
const PORT = process.env.PORT || 3030

app.use(async (ctx) => {
  ctx.body = {
    status: 'success',
    message: 'Hello World!'
  }
})

export const server = app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
})
