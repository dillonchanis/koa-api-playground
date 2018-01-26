import Router from 'koa-router'
const queries = require('../db/queries/books')

const router = new Router()
const BASE_URL = '/api/v1/books'

router.get(BASE_URL, async (context) => {
  try {
    const books = await queries.getAllBooks()
    context.body = {
      status: 'success',
      data: books
    }
  } catch (err) {
    console.log(err)
  }
})

router.get(`${BASE_URL}/:id`, async (context) => {
  try {
    const book = await queries.getBook(context.params.id)

    if (book.length) {
      return context.body = {
        status: 'success',
        data: book
      }
    }

    context.status = 404
    context.body = {
      status: 'error',
      message: 'That book does not exist.'
    }

  } catch (err) {
    console.log(err)
  }
})

export default router
