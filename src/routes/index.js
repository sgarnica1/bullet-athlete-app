const config = require("../config/index");
const publicRouter = require("./public.routes");
const authRouter = require("../routes/auth.routes");
const roleRouter = require("../routes/role.routes");
const permissionRouter = require("./permission.routes");

const initRoutes = (app) => {
  app.use(config.BASE_PATH, publicRouter);
  app.use(`${config.BASE_PATH}/users`, authRouter);
  app.use(`${config.BASE_PATH}/roles`, roleRouter);
  app.use(`${config.BASE_PATH}/permissions`, permissionRouter);
};

module.exports = initRoutes;
