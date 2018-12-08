const express = require('express');
const router = express.Router();
const controller = require('../controllers/profile');
const passport = require('passport');

router.get('/profile', passport.authenticate('jwt', {session: false}), controller.getData);

module.exports = router;