const knex = require('../connection')

const getAllBooks = () => knex('books').select('*')

const getBook = id => knex('books').select('*').where({ id: Number(id) })

const addBook = book => {
  return knex('books').insert(book).then(id => {
    return getBook(id)
  })
}

const updateBook = (id, book) => {
  return knex('books')
    .update(book)
    .where({ id: Number(id) })
    .then(() => {
      return getBook(id)
    })
}

const deleteBook = async id => {
  const book = await getBook(id)
  return knex('books').del().where({ id: Number(id) }).then(() => {
    return book
  })
}

module.exports ={
  getAllBooks,
  getBook,
  addBook,
  updateBook,
  deleteBook
}
