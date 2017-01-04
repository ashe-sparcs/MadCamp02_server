/**
 * Created by Madstein on 2017-01-04.
 */
module.exports = function(app, Post)
{
    // GET ALL POSTS - test passed.
    app.get('/posts', function(req,res){
        Post.find(function(err, posts){
            if(err) return res.status(500).send({error: 'database failure'});
            //console.log(posts);
            res.json(posts);
        });
    });

    // CREATE POST
    app.post('/posts', function(req, res){
        //console.log(req.body);
        // request에 id가 'none'이다. --> 처음 로그인한다는 얘기임.
        Post.create(req.body, function (err, post) {
            if (err) return res.status(500).send({error: 'internal server error'});
            return res.send('post successfully saved');
        })
    });

    // UPDATE POST
    app.put('/posts', function(req, res){
        Post.findByIdAndUpdate(req.body._id, { $set: { title: req.body.title, content: req.body.content }}, function (err, post) {
            if (err) return res.status(500).send({error: 'internal server error'});
            //console.log(req.body);
            //console.log(post);
            return res.json(post);
        })
    });

    // DELETE POST
    app.delete('/posts/', function(req, res){
        Post.findByIdAndRemove(req.body._id, function(err, output){
            if(err) return res.status(500).json({ error: "internal server error" });
            res.json({message: 'post deleted'});
        });
    });
};