const express = require('express')
const { engine } = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('home')
})

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.post('/books/insertbook', (req, res) => {
  const title = req.body.title
  const pageqty = req.body.pagesqty
  const qty = parseInt(pageqty)

  const query = `INSERT INTO BOOK (??, ??) VALUES (?, ?)`
  const data = ['title', 'pageqty', title, pageqty]

  pool.query(query, data, function (err) {
    if (err) {
      console.log(err)
    }
    res.redirect('/')
  })
})

app.get('/books', (req, res) => {
  const query = 'SELECT * FROM book'
  pool.query(query, function (err, data) {
    if (err) {
      console.log(err)
    }
    const book = data
    console.log(book)
    res.render('books', { book })
  })
})

app.get('/books/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM book WHERE ?? = ?`
  const data = ['id', id]
  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err)
    }
    const book = data[0]
    res.render('book', { book })
  })
})

app.get('/books/edit/:id', (req, res) => {
  const id = req.params.id
  const sql = `SELECT * FROM book WHERE ?? = ?`
  const data = ['id', id]
  pool.query(sql, function (err, data) {
    if (err) {
      console.log(err)
    }
    const book = data[0]
    console.log(book)
    res.render('editbook', { book })
  })
})

app.post('/books/update', (req, res) => {
  console.log(req.body.pageqty)
  const id = req.body.id
  const title = req.body.title
  const pageqty = req.body.pagesqty

  const sql = `UPDATE book SET ?? = ?, ?? = ? WHERE ?? = ?`
  const data = ['title', title, 'pageqty', pageqty, 'id', id]

  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err)
    }
    const book = data[0]
    console.log(book)
    res.redirect('/books')
  })
})

app.post('/books/remove/:id', (req, res) => {
  const id = req.params.id
  const sql = `DELETE FROM book WHERE ?? = ?`
  const data = ['id', id]
  pool.query(sql, data, function (err, data) {
    if (err) {
      console.log(err)
    }
    const book = data[0]
    console.log(book)
    res.redirect('/books')
  })
})

app.listen(3000)
