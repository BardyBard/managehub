const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();


router.get('/', (req, res) => {
  res.render('index', {
    layout: 'index' });
});

//make wildcard request to send error for non existing pages
router.get('*', (req, res) => {
  res.status(404).render('error', {
    layout: 'index' });
});

module.exports = router;