/**
 * Created by q on 2016-12-31.
 */
module.exports = function(app, Friend)
{
    // GET ALL FRIENDS OF A USER - passed.
    app.get('/friends/:user_id', function(req,res){
        if(!req.params.user_id) {
            res.send('User not specified.');
        } else {
            Friend.find({whose: req.params.user_id}, function (err, friends) {
                if (err) return res.status(500).send({error: 'database failure'});
                res.json(friends);
            });
        }
    });

    // GET SINGLE FRIEND BY EMAIL(OR PHONE) AND USER ID - passed.
    app.get('/friends/:user_id/:key', function(req, res){
        var key = req.params.key;
        var user_id = req.params.user_id;
        if (key.indexOf('@') !== -1) {
            Friend.findOne({whose: user_id, email: key}, function(err, friend){
                if(err) return res.status(500).json({error: err});
                if(!friend) return res.status(404).json({error: 'user not found'});
                res.json(friend);
            });
        } else {
            Friend.findOne({whose: user_id, phone: key}, function(err, friend){
                if(err) return res.status(500).json({error: err});
                if(!friend) return res.status(404).json({error: 'user not found'});
                res.json(friend);
            })
        }
    });

    /*
    // GET SINGLE FRIEND BY PHONE AND USER ID
    app.get('/api/friends/:user_id/phone/:phone', function(req, res){
        Friend.findOne({phone: req.params.phone}, function(err, friend){
            if(err) return res.status(500).json({error: err});
            if(!friend) return res.status(404).json({error: 'friend not found'});
            res.json(friend);
        });
    });
    */

    // ADD FRIEND TO USER - passed.
    app.post('/friends/:user_id', function(req, res){
        var friend = new Friend();
        // required field.
        friend.whose = req.params.user_id;
        friend.fromWhere = req.body.fromWhere;
        friend.name = req.body.name;

        // optional field
        // either of email or phone is required.
        if (req.body.email) friend.email = req.body.email;
        if (req.body.phone) friend.phone = req.body.phone;
        if (req.body.birth) friend.birth = req.body.birth;
        if (req.body.gender) friend.gender = req.body.gender;

        friend.save(function(err){
            if(err){
                console.error(err);
                res.json({'message':'fail to make new friend TT'});
                return;
            }
            //res.json({'message':'new friend!'});
            res.json(friend);
        });
    });

    // UPDATE THE FRIEND BY EMAIL(OR PHONE) AND USER ID - passed.
    app.put('/friends/:user_id/:key', function(req, res){
        var user_id = req.params.user_id;
        var key = req.params.key;
        if (key.indexOf('@') !== -1) {
            Friend.findOne({whose: user_id, email: key}, function(err, friend){
                if(err) res.status(500).json({error: 'failed to update'});

                if (req.body.name) friend.name = req.body.name;
                if (req.body.phone) friend.phone = req.body.phone;
                if (req.body.birth) friend.birth = req.body.birth;
                if (req.body.gender) friend.gender = req.body.gender;

                friend.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({result: 0});
                        return;
                    }
                    res.json({message: 'friend updated'});
                });
            });
        } else {
            Friend.findOne({whose: user_id, phone: key}, function(err, friend){
                if(err) res.status(500).json({error: 'failed to update'});
                // required field.
                friend.name = req.body.name;

                // optional field
                // either of email or phone is required.
                if (req.body.email) friend.email = req.body.email;
                if (req.body.birth) friend.birth = req.body.birth;
                if (req.body.gender) friend.gender = req.body.gender;

                friend.save(function(err){
                    if(err){
                        console.error(err);
                        res.json({result: 0});
                        return;
                    }
                    res.json({message: 'friend updated'});
                });
            });
        }
    });

    /*
    // UPDATE THE FRIEND BY PHONE AND USER ID
    app.put('/api/friends/:user_id/phone/:phone', function(req, res){
        Friend.findOne({phone:req.params.phone}, function(err, friend){
            if(err) res.status(500).json({error: 'failed to update'});
            // required field.
            friend.name = req.body.name;

            // optional field
            // either of email or phone is required.
            if (req.body.email) friend.email = req.body.email;
            if (req.body.birth) friend.birth = req.body.birth;
            if (req.body.gender) friend.gender = req.body.gender;

            friend.save(function(err){
                if(err){
                    console.error(err);
                    res.json({result: 0});
                    return;
                }
                res.json({message: 'friend updated'});
            });
        });
    });
    */

    // DELETE FRIEND FROM USER BY EMAIL(OR PHONE) AND USER ID - passed.
    app.delete('/friends/:user_id/:key', function(req, res){
        var user_id = req.params.user_id;
        var key = req.params.key;
        if (key.indexOf('@') !== -1) {
            Friend.findOneAndRemove({whose: user_id, email: key}, function(err, output){
                if(err) return res.status(500).json({ error: "database failure" });
                res.json({'message': 'bye friend.'});
            });
        } else {
            Friend.findOneAndRemove({ whose: user_id, phone: key }, function(err, output){
                if(err) return res.status(500).json({ error: "database failure" });
                res.json({'message': 'bye friend.'});
            });
        }
    });

    /*
    // DELETE FRIEND FROM USER BY PHONE AND USER ID
    app.delete('/api/friends/:user_id/phone/:phone', function(req, res){
        Friend.findOneAndRemove({ whose:req. phone: req.body.phone }, function(err, output){
            if(err) return res.status(500).json({ error: "database failure" });
            res.json({'message': 'bye friend.'});
        });
    });
    */

};