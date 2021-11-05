const express = require('express');
const router = express.Router();

router.get('/', (req, res) => res.render('index'));

router.get('/sign-in', (req, res) => res.render('sign-in_form'));
router.get('/sign-up', (req, res) => res.render('sign-up_form'));

module.exports = router;