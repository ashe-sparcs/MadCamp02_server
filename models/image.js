/**
 * Created by q on 2017-01-01.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var imageSchema;
imageSchema = new Schema({
    whose: Schema.ObjectId,
    //album: String,
    path: String, // key?
    originalname: String,
    filename: String
});

module.exports = mongoose.model('image', imageSchema);
