const user_controller = require("../controller/user_controller");

module.exports.user_route = app => {
  app.post("/users", [user_controller.insert]);
};
