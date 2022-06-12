const express = require('express');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');

const router = express.Router();
const Tasks = require('../models/tasks');


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

// router.get('/tasks', (req, res) => {
//   Tasks.find().lean().then((tasks) => {
//     res.render('tasks',{
//       layout: 'index',
//       data: tasks
//     })
//   })
//     .catch(() => { res.send('Sorry! Something went wrong.'); });
// });

router.get('*', (req, res) => {
  res.status(404).render('error', {
    layout: 'index' });
});

module.exports = router;