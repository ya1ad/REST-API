const express = require("express");
const config = require("./common/.env.config");
const get_user_routes = require("./user/routes/user_routes");
const get_auth_routes = require("./auth/routes/auth_routes");
const app = express();

app.use(express.json());

get_user_routes.user_route(app);
get_auth_routes.auth_route(app);

app.listen(config.port, () => {
  console.log("Server is running on %s", config.port);
});
