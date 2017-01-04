/**
 * Created by Madstein on 2017-01-04.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema;
postSchema = new Schema({
    title: String,
    content: String,
    author: String
});

module.exports = mongoose.model('post', postSchema);