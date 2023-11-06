const express = require('express');
const port = 3000;
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const conn = require('./src/db/conn');
const routes = require('./src/routes');
const session = require('express-session');

app.use(
  session({
    secret: 'whoisinparis@#$_*(¨$!',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(
  express.urlencoded({
    extended: true,
  })
);
// importar JSON
app.use(express.json());

const hbs = exphbs.create({
  partialsDir: [path.join(__dirname, '/src/views/partials')],
});

app.set('views', path.join(__dirname, '/src/views'));
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/src/static'));

app.use(routes);

conn
  .sync({force: true})
  .then(() => {
    app.listen(port);
  })
  .catch((error) => {
    console.log('Não foi possível a conexão com a base:', error);
  });
