const mysql = require('mysql')

const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'root',
  password: 'Mudar@123',
  database: 'nodedb'
})

module.exports = pool
