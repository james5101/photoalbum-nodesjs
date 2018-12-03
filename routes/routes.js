var express = require('express');
var aws = require('aws-sdk');
const router = express.Router();
const controller = require('../controllers/contoller')

router.get('/list', controller.listBuckets);
router.get('/getfile', controller.getFile);
router.get('/getimage', controller.getImage);
router.get('/getall', controller.getAllFiles);

module.exports = router;