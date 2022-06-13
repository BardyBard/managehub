const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', {
    layout: 'index',
    loggedin: req.session.success,
    loggedout: req.session.successLogout,
    username: req.session.username,
    admin: req.session.admin
   });
   req.session.success = false;
   req.session.successLogout = false;
});

//make wildcard request to send error for non existing pages
router.get('*', (req, res) => {
  res.status(404).render('error', {
    layout: 'index'
  });
});

module.exports = router;