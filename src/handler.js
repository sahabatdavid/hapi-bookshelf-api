const { nanoid } = require('nanoid');
const books = require('./books');

const addBookHandler = (request, h) => {
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;

  const id = nanoid(7);
  const finished = pageCount === readPage;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id, name, year, author, summary, publisher, pageCount, readPage, finished, reading, insertedAt, updatedAt,
  };

  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  books.push(newBook);

  const isSuccess = books.filter((book) => book.id === id).length > 0;

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

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  const { name, reading, finished } = request.query;

  if (name !== undefined || name === 'Dicoding') {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((data) => data.name.toLowerCase().includes(name.toLowerCase())).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (reading === true) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((reading) => reading).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (reading === false) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((reading) => !reading).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (finished === true) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((finished) => finished).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  if (finished === false) {
    const response = h.response({
      status: 'success',
      data: {
        books: books.filter((finished) => !finished).map((data) => ({
          id: data.id,
          name: data.name,
          publisher: data.publisher,
        })),
      },
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      books: books.map((data) => ({
        id: data.id,
        name: data.name,
        publisher: data.publisher,
      })),
    },
  });

  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const book = books.filter((data) => data.id === bookId)[0];

  if (book !== undefined) {
    return {
      status: 'success',
      data: {
        book,
      },
    };
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku tidak ditemukan',
  });

  response.code(404);
  return response;
};

const editBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name, year, author, summary, publisher, pageCount, readPage, reading,
  } = request.payload;
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);
  if (name == null) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);
    return response;
  }

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);
    return response;
  }

  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = books.findIndex((book) => book.id === bookId);
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

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
  deleteBookByIdHandler,
};