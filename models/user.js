/**
 * Created by q on 2016-12-30.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    email: String,
    name: String,
});

module.exports = mongoose.model('user', userSchema);
