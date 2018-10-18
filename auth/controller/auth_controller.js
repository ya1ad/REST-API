const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const config = require("../../common/.env.config");

exports.login = (req, res) => {
  try {
    const token = jwt.sign(req.body, config.secret, { expiresIn: 60 * 60 });
    res.setHeader("x-auth", token);
    res.status(201).send({ message: "success" });
  } catch (err) {
    res.send().status(500);
  }
};
