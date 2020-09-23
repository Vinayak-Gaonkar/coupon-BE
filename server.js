const config = require('./config/default.config')

const express = require('express');

const app = express();

const bodyParser = require('body-parser');

// const swaggerUi = require('swagger-ui-express');

// const swaggerJsdoc = require('swagger-jsdoc');
const path = require('path');
// const passportService = require('./app/services/passport.service');
// const passport = require('passport');
// const cookieSession = require('cookie-session')

// app.use(cookieSession({
//   maxAge: 20 * 60 * 60 * 1000,
//   keys:[config.cookies.key]
// }))
// app.use(passport.initialize());
// app.use(passport.session());

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', "*");
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();
});
const AuthorizationRouter = require('./app/routes/auth.routes');

const CouponRouter = require('./app/routes/coupon.router');
// const GenresRouter = require('./app/routes/genres.routes');
// const ArtistRouter = require('./app/routes/artists.routes');
// const EventsRouter = require('./app/routes/events.routes');
// const UploadRouter = require('./app/routes/uploads.routes');
// const CommunityRouter = require('./app/routes/community.routes');
// const CommentRouter = require('./app/routes/comments.routes');


const Ajv = require('ajv');

app.use(bodyParser.urlencoded({
  extended: true,
}));

app.use(bodyParser.json());

let router = express.Router();
let passAuth = AuthorizationRouter.routesConfig(router);
let couponRouter = CouponRouter.routesConfig(router);
// let genresRoutes = GenresRouter.routesConfig(router);
// let artistsRoutes = ArtistRouter.routesConfig(router);
// let eventsRoutes = EventsRouter.routesConfig(router);
// let uploadRoutes = UploadRouter.routesConfig(router);
// let communityRoutes = CommunityRouter.routesConfig(router);
// let commentRoutes = CommentRouter.routesConfig(router);


app.use('/api', [passAuth]);

// Swagger definition

// const swaggerDefinition = {
//   openapi: "3.0.2",
//   info: {
//     title: 'Trephoria APIs',
//     version: '1.0.0',
//     description: 'Trephoria backend APIS, here is list of APIs',
//   },
//   host: config.appEndpoint,
//   basePath: '/api',
//   license: {
//     name: "MIT",
//     url: "https://choosealicense.com/licenses/mit/",
//   },
//   contact: {
//     name: "Kanna",
//     url: "www.sociata.com",
//     email: "rajesh.kannan@msystechnologies.com"
//   }
// };

// const options = {
//   swaggerDefinition,
//   // servers: [{url: "http://localhost:3004/api"}],
//   apis: ['./app/routes/*.js', './app/parameters.yaml'],
// }

// const swaggerSpec = swaggerJsdoc(options);

// app.get('/api-docs.json', function (req, res) {
//   res.setHeader('Content-Type', 'application/json');
//   res.send(swaggerSpec)
// });

// app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
// app.use('/api/images', express.static(path.join(__dirname, '/public/images')))
app.on('listening', function () {
  console.log('ok, server is running');
});
app.listen(config.port, function () {
  console.log('app listening at por %s', config.port);
});
