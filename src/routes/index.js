const config = require("../config/index");
const authMiddleware = require("../middleware/auth");
const publicRouter = require("./public.routes");
const authRouter = require("../routes/auth.routes");
const roleRouter = require("../routes/role.routes");

const initRoutes = (app) => {
  app.use(config.BASE_PATH, publicRouter);
  app.use(`${config.BASE_PATH}/auth`, authRouter);
  app.use(
    `${config.BASE_PATH}/roles`,
    authMiddleware.validateTokenActive,
    roleRouter
  );
};

module.exports = initRoutes;
