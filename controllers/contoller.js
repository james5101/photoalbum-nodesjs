var aws = require('aws-sdk');
var multer = require('multer');
var multerS3 = require('multer-s3');

aws.config.update({
	accessKeyId: '',
    secretAccessKey: '',    
    region: 'us-east-1'
});
var s3 = new aws.S3();

var controller = {};

controller.listBuckets = function (req, res) {
    s3.listBuckets({}, function (err, data) {
        if (err) {
            return res.json({ "error": err });
        }
        res.json( data.Buckets );
    });
}

controller.getImage = function(req,res){
    var params = { Bucket: req.param('Bucket'),Key: req.param('Key') };
    s3.getObject(params, function(err, data) {
        res.writeHead(200, {'Content-Type': 'image/jpeg'});
        res.write(data.Body, 'binary');
        res.end(null, 'binary');
});
}

controller.getAllFiles = function(req, res){
    var params = { Bucket: req.param('Bucket'),MaxKeys: req.param('MaxKeys') };
       s3.listObjects(params, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.json(data); 
        }          
         
       });
}

controller.getFile = function (req,res){
    var params = {
        Bucket: req.param('Bucket'), 
        Key: req.param('Key')
       };
       s3.getObject(params, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.json(data.Body); 
        }
         
       });
}
module.exports = controller;