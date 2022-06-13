const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//require database scheemas
const Tasks = require('../models/tasks');
const Classes = require('../models/classes');

router.get('/classes', (req, res) => {
    //retrieve classes from database and pass through as json
    Classes.find().lean().then((classes) => {
        res.render('classes', {
            layout: 'index',
            //pass through json as variable data
            data: classes,
            //pass through any alerts
            created: req.session.success,
            deleted: req.session.successDel,
            //pass through user
            username: req.session.username,
            admin: req.session.admin
        })
        //reset all alerts
        req.session.success = false;
        req.session.successDel = false;
    }).catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/classes/create', (req, res) => {
    res.render('classes/create', {
        layout: 'index',
        //pass through user
        username: req.session.username,
        admin: req.session.admin
    });
})

router.post('/classes/create', (req, res) => {
    //send error if not priveleged
    if (!req.session.admin) return res.redirect('/error');
    //create new database entry with form data
    Classes.create({
        name: req.body.name
    }).then(() => {
        //set success notification to true and redirect to full list
        req.session.success = true
        res.redirect('/classes');
    })
})

router.get('/classes/:class', (req, res) => {
    //retrieve class information from databse
    Tasks.find({ subject: req.params.class }).lean().then((tasks) => {
        res.render('classes/class', {
            layout: 'index',
            //pass through class name for title
            clas: req.params.class,
            //pass through tasks for said class
            data: tasks,
            //pass through user
            username: req.session.username,
            admin: req.session.admin
        })
    }).catch((err) => {
        res.status(404).render('error', {
            layout: 'index'
        });
    })
});

router.get('/classes/delete/:class', async (req, res) => {
    //send error if not priveleged
    if (!req.session.admin) return res.redirect('/error');

    //delete from database
    await Classes.deleteOne({ name: req.params.class }).catch((err) => {
        res.status(404).render('error', {
            layout: 'index'
        });
    })
    //set success notification to true and redirect to full list
    req.session.successDel = true
    res.redirect('/classes');
});

module.exports = router;