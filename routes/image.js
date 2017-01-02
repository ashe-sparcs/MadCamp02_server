/**
 * Created by q on 2017-01-01.
 */

module.exports = function(app, Image, User, multer)
{
    var fs = require('fs');
    var uploadImage = multer({dest: '/image/'});

    // LIST ALL IMAGES
    app.get('/images/:user_id', function(req,res){
        Image.find(function(err, images){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(images);
        });
    });

    // DOWNLOAD SINGLE IMAGE BY ID.
    app.get('/images/:user_id/:image_id', function(req, res){
        var user_id = req.params.user_id;
        var image_id = req.params.image_id;
        Image.findById(image_id, function(err, image) {
            if (image.whose === user_id) {
                res.sendFile(image.path);
            } else {
                res.json({error: 'permission denied'});
            }
        })
    });


    // UPLOAD IMAGE
    app.post('/images/:user_id', uploadImage.single('image'), function(req, res) {
        var user_id = req.params.user_id;
        User.findById(user_id, function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if (!users) {
                res.json({error: 'no such user'});
                return;
            } else {
                var image = new Image();
                var fileInfo = req.files;
                console.log(req.body);
                res.json(req.body);
                console.log(fileInfo);
                image.path = fileInfo.path;
                image.filename = fileInfo.filename;
                image.originalname = fileInfo.originalname;
                image.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({result: 0});
                        return;
                    }
                    res.json(fileInfo);
                });
            }
        });
    });

    /*
    app.post('/images/:user_id', function(req, res) {
        var user_id = req.params.user_id;
        User.findById(user_id, function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if (!users) {
                res.json({error: 'no such user'});
                return;
            } else {
                var image = new Image();
                var fileInfo = req.files;
                console.log(req.files);
                fs.readFile(fileInfo.path, function(err, data) {
                    if (err) {
                        console.log(err);
                        throw err;
                    } else {
                        image.path = fileInfo.path;
                        image.filename = fileInfo.filename;
                        image.originalname = fileInfo.originalname;
                        image.save(function(err){
                            if(err){
                                console.error(err);
                                res.json({result: 0});
                                return;
                            }
                            res.json(fileInfo);
                        });
                    }
                });
            }
        });
    });
    */


    /*
    // UPLOAD IMAGE TO ALBUM
    app.post('/images/:user_id/:album', multer({dest: '/image/'}).single('myfile'), function(req, res) {
        var user_id = req.params.user_id;
        User.findById(user_id, function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            if (users == []) {
                res.json({error: 'no such user'})
                return;
            } else {
                var image = new Image();
                var fileInfo = req.file;
                image.path = fileInfo.path;
                image.filename = fileInfo.filename;
                image.originalname = fileInfo.originalname;
                image.album = req.params.album;
                image.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({result: 0});
                        return;
                    }
                    res.json(fileInfo);
                });
            }
        });
    });
    */

    // DELETE IMAGE
    app.delete('/images/:user_id/:image_id', function(req, res){

    });
};