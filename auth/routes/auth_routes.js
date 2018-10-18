const user_controller = require("../controller/auth_controller");
const verify_user = require("../middleware/auth_validation");
exports.auth_route = app => {
  app.post("/auth", [
    verify_user.hasAuthValidFields,
    verify_user.isPasswordAndEmailMatch,
    user_controller.login
  ]);
};
