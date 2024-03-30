//router files hold all the routes and the middleware they use

const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const {base, login} = require('../controllers/rootController');


router.get('/', base);
router.post('/', login);

module.exports = router;