/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
const books = require('./books');
const {nanoid} = require('nanoid');

const menyimpanBuku = (request, h) => {
  const {name, year, author, summary, publisher, pageCount,
    readPage, reading} = request.payload;

  const id = nanoid(16);
  const finished = (pageCount === readPage);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const bukuBaru = {
    id, name, year, author, summary, publisher,
    pageCount, readPage, finished, reading,
    insertedAt, updatedAt};

  //   try {
  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    },
    );
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    },
    );
    response.code(400);
    return response;
  }
  books.push(bukuBaru);

  const isSuccess = (name != null) &&
  (readPage <= pageCount);


  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }


//   } catch (error) {
//     const response = h.response({
//       status: 'error',
//       message: 'Buku gagal ditambahkan',
//     },
//     );
//     response.code(500);
//     return response;
//   }
};

const menampilkanBuku = (request, h) => {
  const {name, reading, finished} = request.query;

  let bookTiruan = books;

  if (finished !== undefined) {
    if (finished == 1) {
      bookTiruan = bookTiruan.filter((book) => book.finished === true);
    }
    if (finished == 0) {
      bookTiruan = bookTiruan.filter((book) => book.finished === false);
    }
  }

  if (reading !== undefined) {
    bookTiruan = bookTiruan.filter((book) => book.reading === (reading == 1));
  }

  if (name !== undefined) {
    // eslint-disable-next-line max-len
    bookTiruan = bookTiruan.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()));
  }

  const response = h.response({
    status: 'success',
    data: {
      books: bookTiruan.map((book1) => ({
        id: book1.id,
        name: book1.name,
        publisher: book1.publisher,
      })),
    },
  });
  response.code(200);
  return response;
};


const detailBuku = (request, h) => {
  const {id} = request.params;

  const book = books.filter((n) => n.id === id)[0];

  if (book !== undefined) {
    const response = h.response({
      status: 'success',
      data: {
        book,
      },
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });
  response.code(404);
  return response;
};

const ubahDataBuku = (request, h) => {
  const {id} = request.params;


  const {name, year, author, summary, publisher, pageCount,
    readPage, reading} = request.payload;

  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === id);

  const isValid = (index !== -1) &&
  (name!= null) && (readPage <= pageCount);

  if (isValid) {
    books[index] = {
      ...books[index],
      name, year, author,
      summary, publisher, pageCount,
      readPage, reading, updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });
    response.code(200);
    return response;
  }

  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    },
    );
    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      // eslint-disable-next-line max-len
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    },
    );
    response.code(400);
    return response;
  }

  if (index === -1) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);
    return response;
  }
};

const menghapusBuku = (request, h) => {
  const {id} = request.params;

  const index = books.findIndex((book) => book.id === id);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });
    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });
  response.code(404);
  return response;
};


module.exports = {menyimpanBuku, menampilkanBuku,
  detailBuku, ubahDataBuku, menghapusBuku};