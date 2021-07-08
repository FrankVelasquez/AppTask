const mongoose = require("mongoose");
const {Schema} = mongoose;

const TaskSchema =new Schema({
    title: { type: String},
    description : { type: String},
    responsible:  { type: String},
    priority:  { type: String}

});

module.exports= mongoose.model('Task', TaskSchema); 