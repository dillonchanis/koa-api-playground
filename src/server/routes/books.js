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

router.post(`${BASE_URL}`, async (context) => {
  try {
    const book = await queries.addBook(context.request.body)

    if (book.length) {
      context.status = 201
      context.body = {
        status: 'success',
        data: book
      }
    } else {
      context.status = 400
      context.body = {
        status: 'error',
        message: 'Something went wrong'
      }
    }

  } catch (err) {
    context.status = 400
    context.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

router.put(`${BASE_URL}/:id`, async (context) => {
  try {
    const book = await queries.updateBook(context.params.id, context.request.body)
    if (book.length) {
      context.status = 201
      context.body = {
        status: 'success',
        data: book
      }
    } else {
      context.status = 404
      context.body = {
        status: 'error',
        message: 'That book does not exist.'
      }
    }
  } catch (err) {
    context.status = 400
    context.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

router.delete(`${BASE_URL}/:id`, async (context) => {
  try {
    const book = await queries.deleteBook(context.params.id)
    if (book.length) {
      context.status = 200
      context.body = {
        status: 'success',
        data: book
      }
    } else {
      context.status = 404
      context.body = {
        status: 'error',
        message: 'That book does not exist.'
      }
    }
  } catch (err) {
    context.status = 400
    context.body = {
      status: 'error',
      message: err.message || 'Sorry, an error has occurred.'
    }
  }
})

export default router
