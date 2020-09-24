const config = require('./config/default.config')

const express = require('express');

const app = express();

const bodyParser = require('body-parser');
const logger=require("./app/services/logger")
const connection=require("./app/services/mongoose.service")
const path = require('path');
const ejs=require('ejs').renderFile
// app.configure(function () {
  app.engine('html', ejs);
  app.set('view engine', 'html');
  // app.use(express.logger('dev'));
  // app.use(express.methodOverride());
  app.set('port', process.env.PORT || config.port);
  app.use(express.static(path.join(__dirname, 'public')));
// });

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});

const CouponRouter = require('./app/routes/coupon.router');

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());


let router = express.Router();
let couponRouter = CouponRouter.routesConfig(router);

app.use('/api', [couponRouter]);
app.use('/', function(req, res){
  res.render('index', { title: 'Express' });
});




app.on('listening', function () {
  logger.info('ok, server is running');
});
app.listen(app.get('port'), function () {
  logger.info('app listening at port %s', config.port);
});

process.on('uncaughtException', function (err) {
  logger.info('index | uncaughtException, Error: ', err)
  process.exit(1)
})