/**
 * Created by q on 2016-12-30.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema;
userSchema = new Schema({
    facebook_id: String, // key if facebook login. else use default mongoDB id.
    isFacebook: String // "true" or "false" convert to real boolean value by Boolean.parseBoolean in JAVA
});

module.exports = mongoose.model('user', userSchema);
