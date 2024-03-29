var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const hike = require('./routes/hike');

var app = express();

app.get('/hikes', hike.index);
app.post('/add_hike', hike.add_hike);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public'))); //<<-- handled by staticfiles.config

app.use('/', indexRouter);
app.use('/users', usersRouter);

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

////////////////////////////////////////
//comment this out before deploying!!!!

  // Start the server
  if (process.env.NODE_ENV === 'dev'){
    const server = app.listen(8080, () => {
      const port = server.address().port;
      console.log(`App listening on port ${port}`);
    });
  }
////////////////////////////////////////

module.exports = app;
