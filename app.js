const express = require('express');
const path = require('path');
const indexRoutes = require('./routes/index');
const classesRoutes = require('./routes/classes');
const tasksRoutes = require('./routes/tasks');
const { engine } = require('express-handlebars');
const app = express();

app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: "hbs",
    defaultLayout: 'index',
    layoutsDir: "./views/layouts/",
    helpers: require('./scripts/handlebars-helpers')
}));
app.set('views', './views/');

app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));

app.use(tasksRoutes);
app.use(classesRoutes);
app.use(indexRoutes);

module.exports = app;