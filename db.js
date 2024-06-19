const mongoose = require('mongoose');

const Person = require("./models/Person"); 
const MenuItem = require("./models/MenuItem");

mongoose.connect('mongodb://localhost:27017/mydatabase', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function()
{
  console.log("Connected to the database");
});

module.exports = db;
