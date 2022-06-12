const express = require('express');
//const { check, validationResult } = require('express-validator');
const mongoose = require('mongoose');
const router = express.Router();
const nodemailer = require('nodemailer');
const Tasks = require('../models/tasks');
const Classes = require('../models/classes');
const bodyParser = require('body-parser');
const uuid = require('uuid').v4;
const path = require('path');
const multer = require('multer');
const { attachment } = require('express/lib/response');

require('dotenv').config();

router.get('/classes', (req, res) => {
    Classes.find().lean().then((classes) => {
        res.render('classes', {
            layout: 'index',
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
    console.log(req.body)
    Classes.create({
        name: req.body.name
    }).then(() => {
        Classes.find().lean().then((classes) => {
            res.render('classes', {
                layout: 'index',
                data: classes,
                created: true
            })
        }).catch(() => { res.send('Sorry! Something went wrong.'); });
    })
})

router.get('/classes/:class', (req, res) => {
    Tasks.find({ subject: req.params.class }).lean().then((tasks) => {
        res.render('classes/class', {
            layout: 'index',
            clas: req.params.class,
            data: tasks
        })
    }).catch((err) => {
        res.status(404).render('error', {
            layout: 'index'
        });
    })
});

router.get('/classes/delete/:class', async (req, res) => {
    await Classes.deleteOne({ name: req.params.class }).catch((err) => {
        res.status(404).render('error', {
            layout: 'index'
        });
    })
    Classes.find().lean().then((classes) => {
        res.render('classes', {
            layout: 'index',
            data: classes,
            deleted: true
        })
    }).catch(() => { res.send('Sorry! Something went wrong.'); });
});

module.exports = router;