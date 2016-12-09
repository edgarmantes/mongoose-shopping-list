var express = require('express');           // Express
var bodyParser = require('body-parser');    // express
var mongoose = require('mongoose');         // mongoose

var config = require('./config');           // express and mongoose
    
var app = express();                        //express

app.use(bodyParser.json());                 //express
app.use(express.static('public'));          // express

var runServer = function(callback) {
    mongoose.connect(config.DATABASE_URL, function(err) {   //connects to database with mongoose
        if (err && callback) {
            return callback(err);
        }

        app.listen(config.PORT, function() {                // after it connects to database express listens on a port
            console.log('Listening on localhost:' + config.PORT);
            if (callback) {
                callback();
            }
        });
    });
};

if (require.main === module) {   // this allows you to run as a node command or a module.
    runServer(function(err) {
        if (err) {
            console.error(err);
        }
    });
};

exports.app = app;
exports.runServer = runServer;


/***************************
Routes
***************************/

var Item = require('./models/item');   // through mongoose, uses the schema that is set up.

app.get('/items', function(req, res) {
    Item.find(function(err, items) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.json(items);
    });
});

app.post('/items', function(req, res) {
    Item.create({
        name: req.body.name
    }, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.put('/items/:id', function(req, res) {
    Item.findByIdAndUpdate(req.params.id, req.body, {new: true}, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }

        res.status(201).json(item);            
    });
});

app.delete('/items/:id', function(req, res) {
    Item.findByIdAndRemove(req.params.id, function(err, item) {
        if (err) {
            return res.status(500).json({
                message: 'Internal Server Error'
            });
        }
        res.status(201).json(item);
    });
});

app.use('*', function(req, res) {
    res.status(404).json({
        message: 'Not Found'
    });
});