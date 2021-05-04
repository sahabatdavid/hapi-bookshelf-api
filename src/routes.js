const {
  addBookHandler,
  getAllBooksHandler,
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
];

module.exports = routes;