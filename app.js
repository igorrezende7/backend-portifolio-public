var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser = require('body-parser');
var cors = require('cors')
require('./config/database')
const passport = require('passport')
const session = require('express-session')
var app = express();
const ClienteRouter = require('./routes/clientes')
const LoginRouter = require('./routes/login')
const AdminRouter = require('./admin-bro/admin')
require('dotenv').config()
require('./auth')(passport);
// view engine setup

function authenticationMiddleware(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect('/')
}
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());




app.use(session({
  secret:'1234',
  resave:false,
  saveUninitialized:false,
  cookie:{maxAge:120 * 60 * 1000},
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/', LoginRouter)
app.use('/admin', authenticationMiddleware, AdminRouter)
app.use('/clientes', ClienteRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
