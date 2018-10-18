const express = require("express");
const config = require("./common/.env.config");
const app = express();
const get_user_routes = require("./user/routes/user_routes");

app.use(express.json());

get_user_routes.user_route(app);

app.listen(config.port, () => {
  console.log("Server is running on %s", config.port);
});
