const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../../common/.env.config");

exports.login = (req, res) => {
  try {
    const token = jwt.sign(req.body, config.secret);
    res.status(201).send({ accessToken: token });
  } catch (err) {
    res.send().status(500);
  }
};
