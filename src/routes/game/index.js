const express = require('express');

// const authRoute = require('./auth.route');
// const userRoute = require('./user.route');

const friendRoute = require('./friend')
const meRoute = require('./me')
const clanRoute = require('./clan.route')
const docsRoute = require('../v1/docs.route');
const config = require('../../config/config');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/friend',
    route: friendRoute,
  },
  {
    path: '/me',
    route: meRoute,
  },
  {
    path: '/clan',
    route: clanRoute,
  }
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
