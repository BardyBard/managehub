const app = require('./app');
//.env file for database connection
require('dotenv').config();
//tool for database
const mongoose = require('mongoose');

//connect to database
mongoose.connect(process.env.DATABASE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).catch((err) => { console.log(`Database not found.`) });

mongoose.connection
  .on('open', () => {
    console.log('Mongoose connection open');
  })
  .on('error', (err) => {
    console.log(`Connection error: ${err.message}`);
  })

//start app
const server = app.listen(3000, () => {
  console.log(`Express is running on port ${server.address().port}`)
});