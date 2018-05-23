var mongoose = require('mongoose');
  
var userSchema = new mongoose.Schema( {
  username: {
    type: String,
    trim: true,
    minlength: 1
  },
  password: {
    type: String,
    trim: true,
    minlength: 1
  },
});
var User = mongoose.model('User',userSchema);



module.exports = {User};
