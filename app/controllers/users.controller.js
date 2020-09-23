const UserModel = require('../models/users.model');
const crypto = require('crypto');
const TrephoriaError = require('../../util/errors');

exports.insert = async (req, res) => {
  try {
    let salt = crypto.randomBytes(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digest("base64");
    req.body.password = salt + "$" + hash;
    req.body.permissionLevel = 1;
    userExist = await UserModel.findByEmail(req.body.email);
    if (userExist) {
      throw Error("User already exist")
    } else {
      UserModel.createUser(req.body)
        .then((result) => {
          res.status(201).send({ id: result._id });
        })
    }
  } catch (error) {
    console.error("app | Controllers | insert | Erorr", error);
    res.status(400).send({ error: error.message })
  }

};

exports.list = (req, res) => {
  let limit = req.query.limit && req.query.limit <= 100 ? parseInt(req.query.limit) : 25;
  let page = 0;
  if (req.query) {
    if (req.query.page) {
      req.query.page = parseInt(req.query.page);
      page = Number.isInteger(req.query.page) ? req.query.page : 0;
    }
  }
  UserModel.list(limit, page)
    .then((result) => {
      res.status(200).send(result);
    });
};

exports.getById = (req, res) => {
  UserModel.findById(req.params.userId)
    .then((result) => {
      res.status(200).send(result);
    });
};


exports.patchById = (req, res) => {
  if (req.bodypassword) {
    let salt = crypto.randomByte(16).toString('base64');
    let hash = crypto.createHmac('sha512', salt).update(req.body.password).digiest("base64");
    req.body.password = salt + "$" + hash;
  }

  UserModel.patchUser(req.params, req.body)
    .then((result) => {
      res.status(204).send({})
    });
};

exports.removeByID = (req, res) => {
  UserModel.removeByID(req, res)
    .then((result) => {
      res.status(204).send({})
    });
};
