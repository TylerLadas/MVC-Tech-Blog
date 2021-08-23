// Required dependencies
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');

const app = express();

// set up port
const PORT = process.env.PORT || 3001;

// Required folders
// const helpers = require('./utils/helpers');
const path = require('path');
const routes = require('./controllers')

// import helper functions
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

const sess = {
  secret: 'Super secret secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize
  })
};

app.use(session(sess));

// set up template engine
const hbs = exphbs.create({ helpers });

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

// turn on controllers/routes
app.use(routes);

// initialize server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening'));
});