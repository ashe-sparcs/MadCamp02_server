/**
 * Created by q on 2016-12-31.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var friendSchema;
friendSchema = new Schema({
    whose: String, // object id of owner
    fromWhere: String, // 'facebook' or 'phonebook' or 'both'
    email: String, // key if from facebook
    phone: String, // key if from phonebook PHONE NUMBER WITH -(DASH) <-- important
    name: String,
    birth: Date,
    gender: String // M, F, or user defined.
});

module.exports = mongoose.model('friend', friendSchema);
