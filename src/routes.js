const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookByIdHandler,
} = require('./handler');

const routes = [
  {
    method: 'POST',
    path: '/notes',
    handler: addBookHandler,
  },
  {
    method: 'GET',
    path: '/notes',
    handler: getAllBooksHandler,
  },
  {
    method: 'GET',
    path: '/notes/{id}',
    handler: getBookByIdHandler,
  },
  {
    method: 'PUT',
    path: '/notes/{id}',
    handler: editBookByIdHandler,
  },
];

module.exports = routes;