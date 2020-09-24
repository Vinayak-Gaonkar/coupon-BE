/*
Coupon Routes
*/

const CouponController = require('../controllers/coupon.controller');
const ValidationMiddleware = require('../middlewares/coupon.middleware');

const config = require('../../config/default.config');


exports.routesConfig = function(app) {
  app.post('/coupon', [
    ValidationMiddleware.validateCoupon,
    CouponController.createCoupon
  ]);

  app.get('/coupon', [
    CouponController.list
  ]);

  app.get('/coupon/validate/:coupon', [
    CouponController.validate
  ]);

  app.get('/coupon/apply', [
    CouponController.applyCoupon
  ]);

  return app
};
