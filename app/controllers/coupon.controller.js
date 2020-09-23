/*
coupon
Controller
*/

const CouponModel = require("../models/coupon.model");

// List of genres
exports.list = (req, res) => {
    CouponModel.list().then(result => {
        res.status(200).send(result);
    });
};

exports.createCoupon = async (req, res) => {
    try {
        let createResult = await CouponModel.createCoupon(req.body)
        res.status(201).send({
            payload: createResult
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        })
    }
};

exports.validate = async (req, res) => {

    try {
        let coupon = req.params.coupon || '';
        let date = new Date()
        let result = await CouponModel.isValidCoupon(coupon, date)
        console.log(result);
        res.status(200).send({
            payload: result
        });
    } catch (error) {
        res.status(400).send({
            error: error.message
        })
    }

};

exports.applyCoupon = async (req, res) => {

    try {
        let coupon = req.query.coupon || '';
        let amoount = req.query.amoount || 0
        let date = new Date()


        let result = await CouponModel.isValidCoupon(coupon, date)
        console.log(result);
        if (result) {
            if (amoount >= result.minAmount) {

                let payload = {};
                switch (result.type) {
                    case "flat":
                        payload["amountToDeduct"] = result.discountAmount;
                        break;
                    case "percent":
                        let totalDiscount = amoount * (result.discountAmount / 100)
                        payload["amountToDeduct"] = (totalDiscount > result.maxDiscount) ? result.maxDiscount : totalDiscount;
                        break
                    default:
                        console.log(result.type);
                        break;
                }
                console.log(result);
                res.status(200).send({
                    success:true,
                    payload: payload
                });
            } else {
                throw Error(`Need ${result.minAmount - amoount} amount more to enable this coupon`)
            }
        } else {
            throw Error("Coupon got Expired")
        }

    } catch (error) {
        res.status(400).send({
            success:false,
            error: error.message
        })
    }

};
