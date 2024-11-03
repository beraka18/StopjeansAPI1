const mysql = require('mysql2/promise');

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  database: 'crud_adaptacion_a_pagina_web_stop',
});

module.exports = connection;