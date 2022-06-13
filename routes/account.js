const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
//require database scheemas
const Accounts = require('../models/accounts');

router.get('/account/signin', (req, res) => {
    res.render('account/signin', {
        layout: 'index',
        fail: req.session.fail,
        username: req.session.username,
        admin: req.session.admin
    })
    req.session.fail = false
});

router.post('/account/signin', async (req, res) => {
    Accounts.findOne({ username: req.body.username }).lean().then((account) => {
        if (account.password == req.body.password) {
            req.session.username = account.username
            req.session.admin = account.admin
            req.session.success = true
            res.redirect('/');
        }
        else {
            req.session.fail = true
            res.redirect('#')
        }
    }).catch(() => {
        req.session.fail = true
        res.redirect('#')
    });
})

router.get('/account/register', (req, res) => {
    res.render('account/register', {
        layout: 'index',
        fail: req.session.fail,
        username: req.session.username,
        admin: req.session.admin
    })
});

router.get('/account/logout', (req, res) => {
    req.session.destroy()
    res.render('index', {
        layout: 'index',
        // loggedin: req.session.success,
        loggedout: true,
        // username: req.session.username,
        // admin: req.session.admin
    });
    // req.session.successLogout = true
    // res.redirect('/');
});



router.post('/account/register', async (req, res) => {
    let exists = await Accounts.exists({ username: req.body.username }).catch(() => { res.send('Sorry! Something went wrong.'); });
    if (!exists) {
        console.log(req.body.admin)
        Accounts.create({
            username: req.body.username,
            password: req.body.password,
            admin: req.body.admin
        }).then(() => {
            //set success notification to true and redirect to dashboard
            req.session.success = true
            req.session.admin = req.body.admin
            req.session.username = req.body.username
            res.redirect('/');
        })
    }
    else {
        req.session.fail = true
        res.redirect('/account/register');
    }
})

module.exports = router;