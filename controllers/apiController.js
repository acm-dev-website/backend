const mongo_utils = require('../utils/mongo_utils');

//fetch/events [get]
exports.fetchEvent = async(req, res)=>{
    try{
        res.contentType = 'application/json';

        const query = req.query;
        const db = mongo_utils.get_client().db();
        const collection = db.collection('events');


        const result = await collection.find(query,{projection:{_id:0}}).toArray();

        res.send({
            message: result
        })
    }catch(e){
        console.log(e);
        res.status(400).send({msg:'error'});
        return;
    }
}

///fetch/images/:img_name
exports.fetchImage = async(req, res)=>{
    try{
        const img_name = req.params.img_name;
        const bucket = mongo_utils.get_bucket();
        const downloadStream = bucket.openDownloadStreamByName(img_name);
        downloadStream.pipe(res);
    }catch(e){
        console.log(e);
        res.status(404).send({msg:'error'});
        return;
    }
}