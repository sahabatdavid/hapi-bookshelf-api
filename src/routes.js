const {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
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
];

module.exports = routes;