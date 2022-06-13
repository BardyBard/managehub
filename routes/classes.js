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
            data: classes
        })
    }).catch(() => { res.send('Sorry! Something went wrong.'); });
});

router.get('/classes/create', (req, res) => {
    res.render('classes/create', {
        layout: 'index'
    });
})

router.post('/classes/create', (req, res) => {
    //create new database entry with form data
    Classes.create({
        name: req.body.name
    }).then(() => {
        //fake redirect to list with all classes
        Classes.find().lean().then((classes) => {
            res.render('classes', {
                layout: 'index',
                data: classes,
                //pass through variable to show confirmation
                created: true
            })
        }).catch(() => { res.send('Sorry! Something went wrong.'); });
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
            data: tasks
        })
    }).catch((err) => {
        res.status(404).render('error', {
            layout: 'index'
        });
    })
});

router.get('/classes/delete/:class', async (req, res) => {
    //delete from database
    await Classes.deleteOne({ name: req.params.class }).catch((err) => {
        res.status(404).render('error', {
            layout: 'index'
        });
    })
    //fake redirect to class view
    Classes.find().lean().then((classes) => {
        res.render('classes', {
            layout: 'index',
            data: classes,
            //pass through variable to show confirmation
            deleted: true
        })
    }).catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;