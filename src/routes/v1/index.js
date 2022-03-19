const express = require('express');

const authRoute = require('./auth.route');
const marketRoute = require('./market.route');
const presaleRoute = require('./presale.route');
const userRoute = require('./user.route');
const landRoute = require('./land.route');
const cartRoute = require('./cart.route');
const meRoute = require('./me.route');
const miningRoute = require('./mining.route');
const boxRoute = require('./box.route');
const heroRoute = require('./hero.route');
const docsRoute = require('./docs.route');
const loginHistoryRoute = require('./historyLogin.route');
const loginRoute = require('./login.route');
const transRoute = require('./historyTrans.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/land',
    route: landRoute,
  },
  {
    path: '/market',
    route: marketRoute,
  },
  {
    path: '/presale',
    route: presaleRoute,
  },
  {
    path: '/auth',
    route: authRoute,
  },
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
    path: '/login',
    route: loginRoute,
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
    route: loginHistoryRoute,
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
