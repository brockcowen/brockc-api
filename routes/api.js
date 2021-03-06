var express = require('express');
var router = express.Router();
var MongoClient = require('mongodb').MongoClient;

//API Connections
//wordpress api connect
var WP = require('wordpress-rest-api')
var wp = new WP({ endpoint: 'http://localhost/wordpress/wp-json/',
    username: 'brockcowen_dev',
    password: 'Fall1991!',
    auth: true});
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Brock C Owen Api' });
});

//mongodb db connect

//wordpress endpoints

//WP.Posts
//get single post
router.get('/v1/wordpress/getposts/id/:id', function(req, res){

    wp.posts().id(req.params.id).then(function( data ) {
        // do something with the returned posts
        res.send(data.content.rendered)

    }).catch(function( err ) {
        // handle error
        console.error(err);
    });
});

//WP.Users
// get all users
router.get('/v1/wordpress/getusers', function(req, res){
    wp.users().then(function( data ) {
        // do something with the returned posts
        res.send(data);


    }).catch(function( err ) {
        // handle error
        console.error(err);
    });
});
// get single user
router.get('/v1/wordpress/getusers/:uid', function(req, res){
    wp.users().id(req.params.uid).then(function( data ) {
        // do something with the returned posts
        res.send(data);

        console.log(data)
    }).catch(function( err ) {
        // handle error
        console.error(err);
    });
});
// get current user signed into the wordpress api
router.get('/v1/wordpress/getcurrentuser', function(req, res){
    wp.users().me().then(function( data ) {
        // do something with the returned posts
        res.send(data);

        console.log(data)
    }).catch(function( err ) {
        // handle error
        console.error(err);
    });
});

//WP.Pages
//get single page
router.get('/v1/wordpress/getpages/:name', function(req, res){
    wp.pages().name(req.params.name).then(function( data ) {
        // do something with the returned posts
        res.send(data[0].content.rendered);

        console.log(data)
    }).catch(function( err ) {
        // handle error
        console.error(err);
    });
});



//MongoDB
//get all entries in messages collection
router.get('/v1/brockcdb/getMessages', function (req, res) {
    MongoClient.connect(process.env.MONGO_HOST + '/api', function(err, db) {

        db.collection('messages').find().toArray(function (err, result) {
            if (err) throw err

            console.log(result)
            res.send(result);
        })

    });

})

module.exports = router;
