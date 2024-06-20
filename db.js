const mongoose = require('mongoose');
require('dotenv').config();


const mongoURL = process.env.MONGODB_URL_LOCAL; 
//const mongoURL = process.env.MONGODB_URL; 
//const mongoURL = 'mongodb+srv://rohithlee45114:CX8cHFafDmhDUsBr@cluster0.wwxvt15.mongodb.net/'


mongoose.connect(mongoURL, 
 {
   useNewUrlParser: true,
   useUnifiedTopology: true
});
 

const db = mongoose.connection;

db.on('connected',() =>{
   console.log('Connected to MongoDB server');
})

db.on('error',(err) => {
   console.log('MongoDB connection error:',err);
})

db.on('disconnected',() => {
   console.log('MongoDB disconnected');
})

module.exports = db;

/*
const Person = require("./models/Person"); 
const MenuItem = require("./models/MenuItem");
*/

//const mongoURL = 'mongodb://localhost:27017/mydatabase'