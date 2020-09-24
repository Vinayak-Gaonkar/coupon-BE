/*!
 * Module dependencies
 */

// const mongoose = require('../services/mongoose.service').mongoose;
let mongoose = require('mongoose');

const Schema = mongoose.Schema;

/**
 * Coupon schema
 */

const CouponSchema = new Schema({
    CouponCode: {
        type: String,
        required:true
    },
    discountAmount: {
        type: Number,
        required:true
    },
    minAmount: {
        type: Number,
        required:true
    },
    type: {
        type: String,
        required:true,
        enum: ['flat', 'percent']
    },
    startDate: {
        type: Date,
        required:true,
        default: new Date()
    },
    endDate: {
        type: Date,
        required:true,
        default: new Date()
    },
    maxDiscount: {
        type: Number,
        required:true,
        default: new Date()
    }
},
    {
        timestamps: true
    });

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

CouponSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

CouponSchema.set('toJSON', {
    virtuals: true
});

CouponSchema.findById = function (cb) {
    return this.model('Coupons').find({ id: this.id }, cb)
}

/**
 * Methods
 */


/**
 * Statics
 */


/**
 * Register
 */

const Coupon = mongoose.model('Coupon', CouponSchema);



exports.findByCouponId = (id) => {
    return Coupon.findOne({ CouponId: id })
}

exports.createCoupon = async (CouponData) => {
    try {
        const newCoupon = new Coupon(CouponData);
        return await newCoupon.save();
    } catch (error) {
        throw Error(error)
    }
};

exports.isValidCoupon = async (code, date) => {
    return await Coupon.findOne({
        CouponCode: code,
        startDate: { $lte: date },
        endDate: { $gte: date }
    }).lean()
}

exports.list = (perPage, page) => {
    return new Promise((resolve, reject) => {
        Coupon.find()
            .limit(perPage)
            .skip(perPage * page)
            .exec(function (err, Coupons) {
                if (err) {
                    reject(err)
                } else {
                    resolve(Coupons);
                }
            });
    })
};

exports.patchCoupon = (id, CouponData) => {
    return new Promise((resolve, reject) => {
        Coupon.findById(id, function (err, updateCoupon) {
            if (err) reject(err);
            for (let i in CouponData) {
                Coupon[i] = CouponData[i];
            }
            Coupon.save(function (err, updatedCoupon) {
                if (err) return reject(err);
                resolve(updatedCoupon);
            });
        });
    });
};


