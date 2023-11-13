const express = require('express');
const port = 3000;
const exphbs = require('express-handlebars');
const path = require('path');
const app = express();
const conn = require('./src/db/conn');
const routes = require('./src/routes');
const session = require('express-session');
const FileStore = require('session-file-store')(session)

app.use(
  session({
    secret: 'whoisinparis@#$_*(¨$!',
    resave: false,
    saveUninitialized: false,
    store: new FileStore({
      logFn: function () { },
      path: require('path').join(require('os').tmpdir(), 'sessions'),
    }),

    cookie: {
      secure: false,
      maxAge: 360000,
      expires: new Date(Date.now() + 720000),
      httpOnly: true,
    },
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
  .sync({ force: true })
  .then(() => {
    app.listen(port);
  })
  .catch((error) => {
    console.log('Não foi possível a conexão com a base:', error);
  });
