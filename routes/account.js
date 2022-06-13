const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//require database scheemas
const Accounts = require('../models/accounts');

router.get('/account/signin', (req, res) => {
    res.render('account/signin', {
        layout: 'index',
    })
});

router.post('/account/signin', (req, res) => {
    Accounts.findOne({username: req.body.username}).lean().then((account) => {
            res.render('index', {
                layout: 'index',
            })
        }).catch(() => { res.send('Sorry! Something went wrong.'); });
})

module.exports = router;