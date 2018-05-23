var mongoose = require('mongoose');

var foodSchema = new mongoose.Schema( {
  name: {
    type: String,
    trim: true,
    minlength: 1
  },
  calories: {
    type: Number,
    trim: true,
    minlength: 1
  },
  protein: {
    type: Number,
    trim: true,
    minlength: 1
  },
  carbs: {
    type: Number,
    trim: true,
    minlength: 1
  },
  fat: {
    type: Number,
    trim: true,
    minlength: 1
  },
  quantity: {
    type: Number
  }
});
var Food = mongoose.model('Food',foodSchema);


module.exports = {Food}
