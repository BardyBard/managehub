const express = require('express');
const path = require('path');
const indexRoutes = require('./routes/index');
const classesRoutes = require('./routes/classes');
const bodyParser = require('body-parser');
const { engine } = require('express-handlebars');

const app = express();


app.set('view engine', 'hbs');
app.engine('hbs', engine({
    extname: "hbs",
    defaultLayout: 'index',
    layoutsDir: "./views/layouts/"
}));
app.set('views', './views/');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(classesRoutes);
app.use(indexRoutes);

module.exports = app;