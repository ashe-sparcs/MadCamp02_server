var express = require('express');

module.exports = function (app, User) {
    // get single user by email
    app.get('/api/users/:email', function (req, res) {
        User.findOne({email: req.params.email}, function (err, user) {
            if (err) return res.status(500).json({error: err});
            if (!user) return res.status(404).json({error: 'user not found'});
            res.json(user);
        })
    });
    // update user
    app.put('/api/users/:email', function (req, res) {
        User.findById(req.params.email, function (err, user) {
            if (err) return res.status(500).json({error: 'database failure'});
            if (!user) return res.status(404).json({error: 'user not found'});

            if (req.body.name) user.name = req.body.name;

            user.save(function (err) {
                if (err) res.status(500).json({error: 'failed to update'});
                res.json({message: 'user updated'});
            });

        });
    });
    // delete user
    app.delete('/api/users/:email', function (req, res) {
        User.remove({email: req.params.email}, function (err, output) {
            if (err) return res.status(500).json({error: "database failure"});

            /* ( SINCE DELETE OPERATION IS IDEMPOTENT, NO NEED TO SPECIFY )
             if(!output.result.n) return res.status(404).json({ error: "book not found" });
             res.json({ message: "book deleted" });
             */

            res.status(204).end();
        })
    });
    // get all users
    app.get('/api/users', function (req, res) {
        User.find(function (err, users) {
            if (err) return res.status(500).send({error: 'database failure'});
            res.json(users);
        })
    })
    // create user
    app.post('/api/users', function (req, res) {
        var user = new User();
        user.email = req.body.email;
        user.name = req.body.name;

        user.save(function (err) {
            if (err) {
                console.error(err);
                res.json({result: 0});
                return;
            }
            res.json({result: 'user created'});

        });
    });
};
