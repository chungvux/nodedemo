const express = require('express');

// const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const landRoute = require('./land.route');
const cartRoute = require('./cart.route');
const meRoute = require('./me.route');
const miningRoute = require('./mining.route');
const boxRoute = require('./box.route');
const heroRoute = require('./hero.route');
const docsRoute = require('./docs.route');
const loginRoute = require('./historyLogin.route');
const transRoute = require('./historyTrans.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/land',
    route: landRoute,
  },
  // {
  //   path: '/user',
  //   route: userRoute,
  // },
  {
    path: '/cart',
    route: cartRoute,
  },
  {
    path: '/box',
    route: boxRoute,
  },
  {
    path: '/me',
    route: meRoute,
  },
  {
    path: '/mining',
    route: miningRoute,
  },
  {
    path: '/hero',
    route: heroRoute,
  },
  {
    path: '/history',
    route: loginRoute,
  },
  {
    path: '/history',
    route: transRoute,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
