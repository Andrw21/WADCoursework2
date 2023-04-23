const express = require('express');
const hbs = require('hbs');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();

// Register the partials directory
hbs.registerPartials(path.join(__dirname, 'views', 'partials'));

// Set up Handlebars as the view engine
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// All files are styled
app.use('/stylesheets', express.static(path.join(__dirname, 'public/stylesheets')));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Parse incoming requests
app.use(bodyParser.urlencoded({ extended: false }));

// Set up session handling
app.use(
  session({
    secret: 'your-session-secret',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 86400000 }, // 1 day
  })
);

// Use the routers
app.use('/', indexRouter);
app.use('/users', usersRouter);

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
