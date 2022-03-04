const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'seuHostAqui',
  user: '<seuUserAqui>',
  password: '<suaSenhaAqui>',
  database: '<suaDataBaseAqui>'
})

module.exports = pool
