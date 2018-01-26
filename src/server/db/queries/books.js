const knex = require('../connection')

const getAllBooks = () => {
  return knex('books').select('*')
}

const getBook = (id) => {
  return knex('books').select('*').where({ id: Number(id) })
}

module.exports ={
  getAllBooks,
  getBook
}
