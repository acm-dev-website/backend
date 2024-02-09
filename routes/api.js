const express = require("express");
const router = express.Router();
const mongo_utils = require('../utils/mongo_utils');


router.get('/fetch/events', async(req, res)=>{
    res.contentType = 'application/json';

    const db = mongo_utils.get_client().db();
    const collection = db.collection('events');


    const result = await collection.find({},{projection:{_id:0}}).toArray();

    res.send({
        message: result
    })
})

router.get('/fetch/images/:img_name:', async(req, res)=>{
    const img_name = req.params.img_name;
    const bucket = mongo_utils.get_bucket();
    const downloadStream = bucket.openDownloadStreamByName(img_name);
    downloadStream.pipe(res);
});

module.exports = router;