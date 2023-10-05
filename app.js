const express = require('express')
const port = 3000;
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
// con.connect((err) => { console.log(err ?? "Conexão bem sucedida!") })

app.use(
  express.urlencoded({
    extended: true,
  }),
)
// importar JSON
app.use(express.json());


const hbs = exphbs.create({
  partialsDir: ['/src/views/partials']
})

app.set('views', path.join(__dirname, '/src/views'));
app.engine('handlebars', hbs.engine)
app.set('view engine', 'handlebars')

app.use(express.static(__dirname + '/src/static'))


app.get('/', (req, res) => {
  res.render('home')
})
app.listen(port)