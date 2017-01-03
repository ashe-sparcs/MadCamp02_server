// routes/index.js

module.exports = function(app, User)
{
    // GET ALL USERS - test passed.
    app.get('/users', function(req,res){
        User.find(function(err, users){
            if(err) return res.status(500).send({error: 'database failure'});
            res.json(users);
        });
    });

    // GET SINGLE USER BY EMAIL(facebook case) or ID - passed.
    app.get('/users/:key', function(req, res){
        var key = req.params.key;
        if (key.indexOf('@') !== -1) {
            User.findOne({email: key}, function(err, user){
                if(err) return res.status(500).json({error: err});
                if(!user) return res.status(404).json({error: 'user not found'});
                res.json(user);
            });
        } else {
            User.findById(key, function(err, user){
                if(err) return res.status(500).json({error: err});
                if(!user) return res.status(404).json({error: 'user not found'});
                res.json(user);
            })
        }
    });

    /*
    // GET SINGLE USER BY EMAIL (facebook case)
    app.get('/api/users/email/:email', function(req, res){
        User.findOne({email: req.params.email}, function(err, user){
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'user not found'});
            res.json(user);
        });
    });

    // GET SINGLE USER BY ID (else)
    app.get('/api/users/id/:user_id', function(req, res){
        User.findById(req.params.user_id, function(err, user){
            if(err) return res.status(500).json({error: err});
            if(!user) return res.status(404).json({error: 'user not found'});
            res.json(user);
        })
    });
    */

    // CREATE USER - passed.
    app.post('/users', function(req, res){
        // request에 id가 'none'이다. --> 처음 로그인한다는 얘기임.
        var id = req.body.mongo_id;
        if (typeof id == 'undefined') {
            var user = new User();
            if(req.body.email) user.email = req.body.email;
            user.isFacebook = req.body.isFacebook;
            user.save(function(err){
                if(err){
                    console.error(err);
                    res.json({result: 0});
                    return;
                }
                res.json(user);
            });
        } else {
            User.findById(id, function(err, user) {
                if (!user) {
                    var user = new User();
                    if(req.body.email) user.email = req.body.email;
                    user.isFacebook = req.body.isFacebook;
                    user.save(function(err){
                        if(err){
                            console.error(err);
                            res.json({result: 0});
                            return;
                        }
                        res.json(user);
                    });
                } else {
                    res.json({error: "user already exists."});
                    return;
                }
            })
        }
    });

    // UPDATE THE USER - only two things to change : isFacebook, email - passed.
    app.put('/users/:user_id', function(req, res){
        User.findOne({_id:req.params.user_id}, function(err, user){
            if(!user) res.status(404).json({error: 'user not found'});
            if(err) res.status(500).json({error: 'failed to update'});
            // required field.
            if(req.body.email) user.email = req.body.email;
            if(req.body.isFacebook) {
                console.log('facebook modification');
                user.isFacebook = req.body.isFacebook;
            }

            user.save(function(err){
                if(err){
                    console.error(err);
                    res.json({result: 0});
                    return;
                }
                //res.json({message: 'user updated'});
                res.json(user);
            });
        });
    });

    // DELETE USER - passed.
    app.delete('/users/:user_id', function(req, res){
        User.remove({ _id: req.params.user_id }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
            res.json({message: 'user deleted'});
        });
    });

};