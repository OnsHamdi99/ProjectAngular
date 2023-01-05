let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let UserSchema = Schema({
    username : String, 
    mdp : String
});

module.exports = mongoose.model('User', UserSchema, 'Users');
