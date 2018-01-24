import Router from 'koa-router'

const router = new Router()

router.get('/', async (context) => {
  context.body = {
    status: 'success',
    message: 'Hello World!'
  }
})

export default router
