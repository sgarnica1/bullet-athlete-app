const config = require("../config/index");
const authMiddleware = require("../middleware/auth");
const publicRouter = require("./public.routes");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const roleRouter = require("./role.routes");
const scoreTypeRouter = require("./scoreType.routes"); 
const categoryRouter = require("./category.routes")
const wodRouter = require("./wod.routes");

const initRoutes = (app) => {
  app.use(config.BASE_PATH, publicRouter);
  app.use(`${config.BASE_PATH}/auth`, authRouter);
  app.use(`${config.BASE_PATH}/users`, authMiddleware.validateTokenActive, userRouter);
  app.use(`${config.BASE_PATH}/wods`, authMiddleware.validateTokenActive, wodRouter);
  app.use(`${config.BASE_PATH}/roles`, authMiddleware.validateTokenActive, roleRouter);
  app.use(`${config.BASE_PATH}/scoretype`, authMiddleware.validateTokenActive, scoreTypeRouter);
  app.use(`${config.BASE_PATH}/categories`, authMiddleware.validateTokenActive, categoryRouter);
};

module.exports = initRoutes;
