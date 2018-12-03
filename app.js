var express = require('express');
var aws = require('aws-sdk');
var bodyParser = require('body-parser');
var multer = require('multer');
var multerS3 = require('multer-s3');
var path = require('path');
var routes = require('./routes/routes');
require('dotenv').config()  


aws.config.update({
	accessKeyId: '',
    secretAccessKey: '',    
    region: 'us-east-1'
});

var app = express();
app.use(express.static(__dirname + '/public'));
var s3 = new aws.S3();

app.set('view engine','ejs');
app.use(bodyParser.json());
app.use('/api', routes);
app.get('/list', (req, res) => {
    
    
    
});


var upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: 'photobucketnodejs',
        key: function (req, file, cb) {
            cb(null, file.originalname);
        }
    })
});
app.get('/', function (req, res) {
    res.render('index');
});

app.post('/upload', upload.array('uploadFile',1), function (req, res, next) {
    res.send("File uploaded successfully to Amazon S3 Server!");
});

app.listen(3000, function () {
    console.log('Amazon s3 file api is up and listening on port 3000');
    
});