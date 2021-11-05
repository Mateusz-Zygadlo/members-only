var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', (req, res) => res.render('index'));

router.get('/sign-in', (req, res) => res.render('sign-in_form'));

module.exports = router;
