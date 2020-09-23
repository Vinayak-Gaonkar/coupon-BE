/*
Artist
Controller
*/

const CouponModel = require("../models/coupon.model");
// const BandsInTown = require("../services/bandsintown.service");
// const MusicBrainz = require("../services/musicbrainz.service");

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
