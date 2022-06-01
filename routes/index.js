const express = require('express');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const router = express.Router();
const registration = require('../models/registration');


router.get('/', (req, res) => {
  res.render('index', {
    layout: 'index' });
});
/*
router.post('/',
  [
    check('name')
      .isLength({ min: 1 })
      .withMessage('Please enter a name'),
    check('email')
      .isLength({ min: 1 })
      .withMessage('Please enter an email'),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      const register = new registration(req.body);
      register.save()
        .then(() => { res.send('Thank you for your registration!'); })
        .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });
    } else {
      res.render('form', {
        title: 'Registration form',
        errors: errors.array(),
        data: req.body,
      });
    }
  }
);
*/

//#region registrations
router.get('/registrations', (req, res) => {
  registration.find().then((registrations) => {
    //res.render('index', { title: 'Listing registrations', registrations });
    console.log(registrations)
    res.render('registrations',{
      layout: 'index',
      data: registrations
    })

  })
    .catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;