const user_model = require("../model/user_model.js");
const crypto = require("crypto");
exports.insert = (req, res) => {
  let salt = crypto.randomBytes(16).toString("base64");
  let hash = crypto
    .createHmac("sha512", salt)
    .update(req.body.password)
    .digest("base64");
  req.body.password = salt + "$%%" + hash;
  req.body.level = 1;
  user_model.createUser(req.body).then(result => {
    res.status(201).send({ message: "success", id: result._id });
  });
};
