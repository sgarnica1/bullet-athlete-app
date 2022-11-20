const config = require("../config/index");
const authMiddleware = require("../middleware/auth");
const publicRouter = require("./public.routes");
const authRouter = require("./auth.routes");
const userRouter = require("./user.routes");
const roleRouter = require("./role.routes");
const scoreTypeRouter = require("./scoreType.routes");
const categoryRouter = require("./category.routes");
const wodRouter = require("./wod.routes");
const wodScoreRouter = require("./wodscore.routes");
const movementRouter = require("./movement.routes");
const personalRecordRouter = require("./personalRecord.routes");
const skillsRouter = require("./skills.routes");

const initRoutes = (app) => {
  app.use(config.BASE_PATH, publicRouter);
  app.use(`${config.BASE_PATH}/auth`, authRouter);
  app.use(authMiddleware.validateTokenActive); // TOKEN VALIDATION
  app.use(`${config.BASE_PATH}/users`, userRouter);
  app.use(`${config.BASE_PATH}/wods`, wodRouter);
  app.use(`${config.BASE_PATH}/wodscores`, wodScoreRouter);
  app.use(`${config.BASE_PATH}/roles`, roleRouter);
  app.use(`${config.BASE_PATH}/scoretype`, scoreTypeRouter);
  app.use(`${config.BASE_PATH}/categories`, categoryRouter);
  app.use(`${config.BASE_PATH}/pr`, personalRecordRouter);
  app.use(`${config.BASE_PATH}/movements`, movementRouter);
  app.use(`${config.BASE_PATH}/skills`, skillsRouter);
};

module.exports = initRoutes;
