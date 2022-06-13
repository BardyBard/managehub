//express is to run entire website
const express = require('express');;
const { engine } = require('express-handlebars');
const session = require('express-session');

//require routers from my modules
const indexRoutes = require('./routes/index');
const classesRoutes = require('./routes/classes');
const tasksRoutes = require('./routes/tasks');
const accountRoutes = require('./routes/account');
const uuid = require('uuid').v4;

const app = express();

//set up app
app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: "hbs",
    defaultLayout: 'index',
    layoutsDir: "./views/layouts/",
    helpers: require('./scripts/handlebars-helpers')
}));
app.set('views', './views/');

//use urlencoded for forms
app.use(express.urlencoded({extended: true}));
//use static for uploads, js and css
app.use(express.static('public'));
//for cookies
app.use(session({
    secret: uuid(),
    resave: false,
    saveUninitialized: true
}))

//declare routers
app.use(tasksRoutes);
app.use(classesRoutes);
app.use(accountRoutes);
app.use(indexRoutes);

module.exports = app;