const config = require("../utils/config");
const publicRouter = require("./public.routes");
const permissionRouter = require("./permission.routes");

const initRoutes = (app) => {
  app.use(config.BASE_PATH, publicRouter);
  app.use(`${config.BASE_PATH}/permissions`, permissionRouter);
};

module.exports = initRoutes;
