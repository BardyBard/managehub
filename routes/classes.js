const express = require('express');
const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const router = express.Router();
const application = require('../application.js');
const nodemailer = require('nodemailer');
const registration = require('../models/registration');
require('dotenv').config();

let transport = nodemailer.createTransport({
    /*host: 'smtp.gmail.com',
    port: '587',
    secure: true,*/
    service: 'gmail',
    auth: {
        user: 'game.io9999@gmail.com',
        pass: `${process.env.EMAILPASS}`,
    }
});

router.get('/classes', (req, res) => {
    res.render('classes', {
        layout: 'index'
    });
});

router.get('/classes/physics', (req, res) => {
    res.render('classes/physics', {
        layout: 'index'
    });
});

router.get('/classes/upload', (req, res) => {
    res.render('classes/upload',{
        layout: 'index'
    });
})

router.post('/classes/upload', (req, res) => {
    console.log(req.body);
    const register = new registration(req.body);
      register.save()
        .then(() => { res.send('Thank you for your registration!'); })
        .catch((err) => {
          console.log(err);
          res.send('Sorry! Something went wrong.');
        });
});

// router.post('/classes/:class', (req, res) => {
//     registration.find().then((registrations) => {
//         const message = {
//             from: 'game.io999@gmail.com',
//             to: 'a2005magnus@gmail.com',
//             subject: 'Managehub Notification',
//             html: application.formatHtmlBody(req.body, registrations)
//         };

//         transport.sendMail(message, (err, info) => {
//             if(err){
//                 console.log(err);
//             } else{
//                 console.log(info);
//             }
//         })

//         res.render('classes/physics', {
//             layout: 'index',
//             submitted: true
//         })
//       })
//         .catch(() => { res.send('Sorry! Something went wrong.'); });


// });

module.exports = router;