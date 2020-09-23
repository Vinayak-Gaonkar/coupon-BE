/*!
 * Module dependencies
 */

const mongoose = require('../services/mongoose.service').mongoose;
const Schema = mongoose.Schema;

/**
 * Coupon schema
 */

const CouponSchema = new Schema({
    CouponCode: { type: String },
    discountAmount: { type: Number },
    minAmount: { type: Number },
    type: { type: String,enum:['flat', 'percent'] },
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: { 
        type: Date,
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


exports.findByEmail = (email) => {
    return Coupon.findOne({ email: email })
}

exports.findByCouponId = (id) => {
    return Coupon.findOne({ CouponId: id })
}

exports.findById = (id) => {
    return Coupon.findById(id)
        .then((result) => {
            result = result.toJSON();
            delete result._id;
            delete result._v
            return result;
        });
};

exports.createCoupon = async(CouponData) => {
    try {
        const newCoupon = new Coupon(CouponData);
        return await newCoupon.save();
    } catch (error) {
        throw Error(error)
    }
};

exports.isValidCoupon=async (code,date)=>{
    return await Coupon.findOne({
        CouponCode:code,
        startDate:{$lte:date},
        endDate:{$gte:date}
    })
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

exports.removeByID = (CouponId) => {
    return new Promise((resolve, reject) => {
        Coupon.remove({ _id: CouponId }, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve(err);
            }
        });
    });
};
