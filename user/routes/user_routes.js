const user_controller = require("../controller/user_controller");
const user_auth = require("../../auth/middleware/auth_validation");

module.exports.user_route = app => {
  app.post("/users", [user_controller.insert]);
  app.get("/users/:id", [user_auth.validTokenNeeded, user_controller.getById]);
  app.delete("/users/:id", [
    user_auth.validTokenNeeded,
    user_auth.isSameUser,
    user_auth.isHasValidPermission,
    user_controller.removeUser
  ]);
};
