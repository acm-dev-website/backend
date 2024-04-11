//router files hold all the routes and the middleware they use

const express = require("express");
const router = express.Router();
const routes = require('../controllers/rootController');

//routes for frontend
router.get('/',routes.homePage);
router.get('/workshops',routes.workshopPage);
router.get('/events', routes.eventPage);
router.get('/calendar',routes.calenderPage);
router.get('/important-links',routes.importantLinkPage);
router.get('/leadership',routes.leadershipPage);
router.get('/merchandise',routes.merchandisePage);
router.get('/projects',routes.projectPage);

module.exports = router;