global.DATABASE_URL = 'mongodb://emantes:Lakers7!@ds127928.mlab.com:27928/mongodb-shopping-list-thinkful'

                                //localhost/shopping-list-test';

var chai = require('chai');
var chaiHttp = require('chai-http');

var server = require('../server.js');
var Item = require('../models/item');

var should = chai.should();
var app = server.app;

chai.use(chaiHttp);
var testObject = null;

describe('Shopping List', function() {
    before(function(done) {
        server.runServer(function() {
            Item.create({name: 'Broad beans', id: 1},
                        {name: 'Tomatoes'},
                        {name: 'Peppers'}, function() {
                done();
                Item.find(function(err, items){
                    testObject = items[0].id
                })
            });
        });
    });

    it('should list items on GET', function(done) {
        chai.request(app)
            .get('/items')
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('array');
                res.body.should.have.length(3);
                res.body[0].should.be.a('object');
                res.body[0].should.have.property('_id');
                res.body[0].should.have.property('name');
                res.body[0]._id.should.be.a('string');
                res.body[0].name.should.be.a('string');
                res.body[0].name.should.equal('Broad beans');
                res.body[1].name.should.equal('Tomatoes');
                res.body[2].name.should.equal('Peppers');
                done();
            });
    });

    it('should add an item on POST', function(done) {
        chai.request(app)
            .post('/items')
            .send({'name': 'Kale'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Kale');
                Item.find(function(err, items){
                    items.should.be.an('array');
                });
                Item.find(function(err, items){
                    items.should.have.length(4);
                });
                Item.find(function(err, items){
                    items[2].should.be.a('object');
                });
                Item.find(function(err, items){
                    items[3].should.have.property('_id');
                });
                Item.find(function(err, items){
                    items[3].should.have.property('name');
                });
                Item.find(function(err, items){
                    items[3]._id.should.be.a('number');
                });
                Item.find(function(err, items){
                    items[3].name.should.be.a('string');
                });
                done();
            });
    });

    it('should edit an item on put', function(done) {
        chai.request(app)
            .put('/items/'+ testObject)
            .send({'name': 'Beans'})
            .end(function(err, res) {
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('name');
                res.body.should.have.property('_id');
                res.body.name.should.be.a('string');
                res.body._id.should.be.a('string');
                res.body.name.should.equal('Beans');
                res.body._id.should.equal(testObject);
                Item.find(function(err, items){
                    items.should.be.an('array');
                });
                Item.find(function(err, items){
                    items.should.have.length(4);
                });
                Item.find(function(err, items){
                    items[0].should.have.a('object');
                });
                Item.find(function(err, items){
                    items[0].should.have.property('id');
                });
                Item.find(function(err, items){
                    items[0].should.have.property('name');
                });
                Item.find(function(err, items){
                    items[0]._id.should.be.a('number');
                });
                Item.find(function(err, items){
                    items[0].name.should.be.a('string');
                });
                Item.find(function(err, items){
                    items[0].name.should.equal('Beans');
                });

                done();
            });
    });

    it('should delete an item on delete', function(done){
        chai.request(app)
            .delete('/items/'+ testObject)
            .end(function(err, res){
                should.equal(err, null);
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.not.be.a('array');
                res.body.should.be.a('object');
                res.body.should.have.property('_id');
                res.body.should.have.property('name');
                res.body._id.should.be.a('string');
                res.body._id.should.equal(testObject)
                res.body.name.should.be.a('string');
                Item.find(function(err, items){
                    items[0].name.should.equal('Tomatoes');
                });
                Item.find(function(err, items){
                    items[0].should.have.a('object');
                });
                Item.find(function(err, items){
                    items[0].should.have.property('_id');
                });
                Item.find(function(err, items){
                    items[0].should.have.property('name');
                });
                Item.find(function(err, items){
                    items[0].id.should.be.a('string');
                });
                Item.find(function(err, items){
                    items[0].name.should.be.a('string');
                });

                done();
            });
    });

    after(function(done) {
        Item.remove(function() {
            done();
        });
    });
});