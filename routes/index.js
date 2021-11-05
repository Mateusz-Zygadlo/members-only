const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get('/log-in', (req, res) => res.render('log-in_form'));
router.get('/sign-up', (req, res) => res.render('sign-up_form'));

module.exports = router;