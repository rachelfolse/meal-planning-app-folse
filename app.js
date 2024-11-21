const express = require('express');
const exphbs = require('express-handlebars');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const mongoose = require('./config/connection');
const routes = require('./routes');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Set up Handlebars
const hbs = exphbs.create();
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Session Middleware
app.use(
  session({
    secret: 'Super secret secret',
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
      mongoUrl: process.env.MONGO_URI,
    }),
    cookie: { maxAge: 2 * 60 * 60 * 1000 }, // 2 hours
  })
);

// Use routes
app.use(routes);

// Connect to MongoDB and start the server
mongoose.connection.once('open', () => {
  app.listen(PORT, () => console.log(`App running on http://localhost:${PORT}`));
});
