const express = require('express')
const port = 3000;
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)
// importar JSON
app.use(express.json());

const hbs = exphbs.create({
  partialsDir: [path.join(__dirname, '/src/views/partials')]
})

app.set('views', path.join(__dirname, '/src/views'));
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/src/static'))

// Endpoints
app.get('/', (req, res) => {
  res.render('home', { title: "Inicio" })
})

app.get('/register', (req, res) => {
  res.render('register', { title: "Cadastro" })
})

app.get('/login', (req, res) => {
  res.render('login', { title: "Login" })
})

app.get('/music', (req, res) => {
  res.render('musicPage', { title: 'Music' })
})
app.listen(port)