
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('books').del()
    .then(function () {
      // Inserts seed entries
      return knex('books').insert([
        {
          id: 1,
          name: 'Cosmos',
          author: 'Carl Sagan',
          genre: 'Science',
          rating: 5
        },
        {
          id: 2,
          name: 'Tao Te Ching',
          author: 'Lao Tzu',
          genre: 'Religion & Spirituality',
          rating: 3
        },
        {
          id: 3,
          name: 'The Greatest Show on Earth',
          author: 'Richard Dawkins',
          genre: 'Science',
          rating: 4
        },
        {
          id: 4,
          name: 'Call of the Wild',
          author: 'Jack London',
          genre: 'Fiction',
          rating: 3
        }
      ]);
    });
};
