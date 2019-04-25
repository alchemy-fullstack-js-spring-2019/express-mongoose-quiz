const mongoose = require('mongoose');

const colorSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  hex:{
    type:String,
    required:true
  },
  red:{
    type:Number,
    required:true
  },
  green:{
    type:Number,
    required:true
  },  
  blue:{
    type:Number,
    required:true
  }
})
;

module.exports = mongoose.model('Color', colorSchema);
