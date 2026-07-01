require('dotenv').config();
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const expressLayouts = require('express-ejs-layouts');  // ✅ added
const mongooseConnect = require('./config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// DB connect
mongooseConnect();

// view engine + layouts
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(expressLayouts);               // ✅ enable layouts
app.set('layout', 'layout');           // ✅ default layout file (views/layout.ejs)

// middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// session
app.use(session({
  secret: process.env.SESSION_SECRET || 'change_this',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  cookie: { maxAge: 1000 * 60 * 60 * 24 } // 1 day
}));

// flash-like helper
app.use((req, res, next) => {
  res.locals.currentUser = req.session.user || null;
  res.locals.error = req.session.error || null;
  res.locals.success = req.session.success || null;
  delete req.session.error;
  delete req.session.success;
  next();
});
app.use((req, res, next) => {
  res.locals.title = "EJS Auth MVC"; // default title
  next();
});

// routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const safetyRoutes = require('./routes/safety');

app.use('/safety', safetyRoutes);


app.use('/', indexRoutes);
app.use('/auth', authRoutes);

// start
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
