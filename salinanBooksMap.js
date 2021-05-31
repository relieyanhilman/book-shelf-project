/* eslint-disable linebreak-style */
const books = require('./books');

const response = h.response({
  status: 'success',
  data: {
    books: books.map((book1) => ({
      id: book1.id,
      name: book1.name,
      publisher: book1.publisher,
    })),
  },
});

response.code(200);
return response;
