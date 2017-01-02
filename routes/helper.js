/**
 * Created by q on 2017-01-02.
 */
var fs = require('fs');
var mongoose = require('mongoose');
var multer  = require('multer');
var path = require('path');

var uploadDir = __dirname + '/../media/uploads/';
var storage = multer.diskStorage({
    destination: uploadDir,
    filename: function (req, file, cb) {
        var userId = req.params.user_id;
        cb(null, userId + '_' + file.originalname);
    }
});
var upload = multer({ storage: storage });

var User = require('../models/user');

function handleError(err, res, msg) {
    console.error(err);
    res.status(500).json({err, msg});
}

function getImagePath(userId, imageId) {
    var filePath = uploadDir + userId + '_' + imageId;
    return path.resolve(filePath);
}

function findById(req, res){
    var id = req.params.id;
    User.findById(id, function)
};

function save(req, res){
    var data = req.body;
    data.id = data.id || new mongoose.mongo.ObjectID();

    Item.findOneAndUpdate({_id: data.id}, data, {upsert:true})
        .then(() => res.json({id: data.id}))
.catch((err) => handleError(err, res, 'Failed to save item'));
};

function remove(req, res){
    var id = req.params.id;

    Item.remove({_id: id})
        .then(() => res.json({_id:id}))
.catch((err) => handleError(err, res, 'Failed to delete item'));
};

function findImage(req, res) {
    var id = req.params.id;
    var imgId = req.params.imgId;

    res.sendFile(getImagePath(id, imgId));
}

function processUploadImage(req, res, next) {
    var id = req.params.id;

    Item.findById(id).exec()
        .then((item) => {
        req.body.id = id;
    item.images.push(req.file.originalname);
    req.body.images = item.images;
    next();
})
.catch((err) => handleError(err, res, 'Failed to load item'));
}

function deleteImage(req, res, next) {
    var id = req.params.id;
    var imgId = req.params.imgId;

    Item.findById(id).exec()
        .then((item) => {
        var index = item.images.indexOf(imgId);
    if (index > -1) {
        item.images.splice(index, 1);

        fs.unlink(getImagePath(id, imgId));
    }

    req.body.id = id;
    req.body.images = item.images;
    next();
})
.catch((err) => handleError(err, res, 'Failed to load item'));
}

var uploadImage = [upload.single('image'), processUploadImage, save];

var removeImage = [deleteImage, save];

module.exports = {
    findAll,
    findById,
    save,
    remove,
    findImage,
    uploadImage,
    removeImage
};