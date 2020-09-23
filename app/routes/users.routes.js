/*
User Routes
*/

const UsersController = require('../controllers/users.controller');
const PermissionMiddleware = require('../middlewares/auth.permission.middleware');
const ValidationMiddleware = require('../middlewares/auth.validation.middleware');
const GenreController = require('../controllers/genres.controller');

const config = require('../../config/default.config');

const ADMIN = config.permissionLevels.ADMIN;
const PAID = config.permissionLevels.PAID_USER;
const FREE = config.permissionLevels.NORAML_USER;

exports.routesConfig = function(app) {
  app.post('/users', [
    UsersController.insert
  ]);

  app.get('/users', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(PAID),
    UsersController.list
  ]);

  app.get('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.getById
  ]);

  app.patch('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(FREE),
    PermissionMiddleware.onlySameUserOrAdminCanDoThisAction,
    UsersController.patchById
  ]);

  app.delete('/users/:userId', [
    ValidationMiddleware.validJWTNeeded,
    PermissionMiddleware.minimumPermissionLevelRequired(ADMIN),
    UsersController.removeByID
  ]);
};
