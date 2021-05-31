/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
const {menyimpanBuku, menampilkanBuku,
  detailBuku, ubahDataBuku, menghapusBuku} = require('./handler');
const routes = [{
  method: 'POST',
  path: '/books',
  handler: menyimpanBuku,
},
{
  method: 'GET',
  path: '/books',
  handler: menampilkanBuku,
},
{
  method: 'GET',
  path: '/books/{id}',
  handler: detailBuku,
},
{
  method: 'PUT',
  path: '/books/{id}',
  handler: ubahDataBuku,
},
{
  method: 'DELETE',
  path: '/books/{id}',
  handler: menghapusBuku,
},

];

module.exports = routes;