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
        user_id: user._id,
        level: user.level,
        name: user.firstName + user.lastName
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

exports.isSameUser = (req, res, next) => {
  if (req.jwt.user_id === req.params.id) {
    return res.status(401).send({ message: "failure" });
  }
  return next();
};

exports.isHasValidPermission = (req, res, next) => {
  /**
   * Let's assume level 1 is admin user
   */
  if (req.jwt.level === 1) {
    return next();
  }
  return res.status(401).send({ message: "failure" });
};
