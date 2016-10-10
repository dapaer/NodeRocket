//初始化配置：配置跟路径
global.root_dirName = __dirname;

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

//var routes = require('./routes/index');
//var users = require('./routes/users');
var http = require('http');
var util =  require('util')

var Result =  require('./sys/entity/result.js');
var config =  require('./sys/config/Config.js');
var StringUtil =  require('./sys/util/StringUtil.js');

//配置服务对象 
config.configServiceObj();

//mongodb setting
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;//内置使用的是bluebird,现在换成原生的,后期有空再弄
mongoose.connect('mongodb://dapaer:dapaer@localhost:27017/node');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//app.use('/', routes);
//app.use('/users', users);





//统一配置拦截器
app.all(/^\/server\/([A-Z,a-z,0-9])+!([A-Z,a-z,0-9])+$/,function(req,res){
  var url =  req.url;
  var actionName = StringUtil.getActionName(url);
  var methodName = StringUtil.getMethodName(url);
  var action = config.servicesObj[actionName];
  var params = req.body;
  if(req.method=='GET'){
    params = req.query;
  }
  if(params.page&&params.pageSize){
    params.pageObj = {
      page:params.page,
      pageSize:params.pageSize
    }
    delete params.page;
    delete params.pageSize;
    delete params.ft_pageCount;
  }
  if(util.isFunction(action[methodName])){
    action[methodName](req,res,params);
  }
  else{
    var result = new Result();
    result.configError(actionName+"类或"+methodName+"方法未实现!!!");
    res.send(result);
  }
})


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

http.createServer(app).listen(3000,function(req,res){
  console.info("start the server!!!");
});
module.exports = app;
