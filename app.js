var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');

var thaiApi = require('./routes/thai/api');
var thaiSummary = require('./routes/thai/summary');
var thaiContent = require('./routes/thai/content');

var thaimcApi = require('./routes/thaimc/api');
var thaimcSummary = require('./routes/thaimc/summary');
var thaimcContent = require('./routes/thaimc/content');

var thaimmApi = require('./routes/thaimm/api');
var thaimmSummary = require('./routes/thaimm/summary');
var thaimmContent = require('./routes/thaimm/content');

var thaibtApi = require('./routes/thaibt/api');
var thaibtSummary = require('./routes/thaibt/summary');
var thaibtContent = require('./routes/thaibt/content');

var paliApi = require('./routes/pali/api');
var paliSummary = require('./routes/pali/summary');
var paliContent = require('./routes/pali/content');

var romanctApi = require('./routes/romanct/api');
var romanctSummary = require('./routes/romanct/summary');
var romanctContent = require('./routes/romanct/content');

var dict = require('./routes/dict/dict');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/thai/api', thaiApi);
app.use('/thai/summary', thaiSummary);
app.use('/thai/content', thaiContent);

app.use('/thaimc/api', thaimcApi);
app.use('/thaimc/summary', thaimcSummary);
app.use('/thaimc/content', thaimcContent);

app.use('/thaimm/api', thaimmApi);
app.use('/thaimm/summary', thaimmSummary);
app.use('/thaimm/content', thaimmContent);

app.use('/pali/api', paliApi);
app.use('/pali/summary', paliSummary);
app.use('/pali/content', paliContent);

app.use('/thaibt/api', thaibtApi);
app.use('/thaibt/summary', thaibtSummary);
app.use('/thaibt/content', thaibtContent);

app.use('/romanct/api', romanctApi);
app.use('/romanct/summary', romanctSummary);
app.use('/romanct/content', romanctContent);

app.use('/dict', dict);

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
