const user_model = require("../../user/model/user_model");
const config = require("../../common/.env.config");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
exports.hasAuthValidFields = (req, res, next) => {
  let errors = [];

  if (req.body) {
    if (!req.body.email) {
      errors.push("Missing email field");
    }
    if (!req.body.password) {
      errors.push("Missing password field");
    }

    if (errors.length) {
      return res.status(400).send({ errors: errors.join(",") });
    } else {
      return next();
    }
  } else {
    return res
      .status(400)
      .send({ errors: "Missing email and password fields" });
  }
};

exports.isPasswordAndEmailMatch = (req, res, next) => {
  //password
  user_model.getUserByEmail(req.body.email).then(user => {
    if (!user) {
      res.status(401).send({ message: "failure" });
    }
    let info = user.password.split("$%%");
    let salt = info[0];
    let hash = crypto
      .createHmac("sha512", salt)
      .update(req.body.password)
      .digest("base64");
    if (hash === info[1]) {
      req.body = {
        user_id: user._id
      };
      return next();
    }
    res.status(401).send({ message: "failure" });
  });
};

exports.validTokenNeeded = (req, res, next) => {
  if (req.headers["x-auth"]) {
    try {
      req.jwt = jwt.verify(req.headers["x-auth"], config.secret);
      return next();
    } catch (error) {
      return res.status(401).send();
    }
  }

  return res.status(401).send();
};
