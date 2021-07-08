const mongoose = require('mongoose');
require('dotenv').config();
const {HOST, DB } = process.env;

const uri = `mongodb://${HOST}/${DB}`;

 mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
 })
  .then(db => console.log(`Conectado exitosamente a ${uri} `))
  .catch(err => console.error(err));

 
module.exports = mongoose;
