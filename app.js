var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var getgui = require('./routes/getgui');

response = "";



//var mpd = require('mpd'),
//    cmd = mpd.cmd
//var client = mpd.connect({
//  port: 6600,
//  host: 'localhost',
//});

var guifunctions=require('./guifunctions.js');





var app = express();
var http = require( "http" ).createServer( app );
var io = require( "socket.io" )( http );
http.listen(8000, "localhost");


io.on('connection',function(socket){
  console.log("A user is connected");
  var guifile = require("./gui.json");

  var state = guifile.state

  console.log("Panel = " + state.activePanel)

   guifunctions.buildGui(socket);
guifunctions.startMpcConnector()



  socket.on('message', function(data){
    console.log('received: ' + data.msg);

  })

  socket.on('click',function(data){

    console.log ('function: ' +data.function);
    console.log ('param: ' +data.param);


   guifunctions.guiButtons(data.function,data.param)
    console.log (response);
  })


});



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.get('/getgui', getgui);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
