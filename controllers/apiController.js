const mongo_utils = require('../utils/mongo_utils');

//fetch/events [get]
exports.fetchEvent = async(req, res)=>{
    try{
        res.contentType = 'application/json';

        const getName = req.query.name;
        const getType = req.query.type;
        const getDate = req.query.date;

        const query = {};
        if(getName) {
            query.name = { $regex: getName, $options: 'i' };
        } 
        
        if(getType) {
            query.type = getType;
        }

        if(getDate) {
            query.date = getDate;
        }

        const db = mongo_utils.get_client().db();
        const collection = db.collection('events');

        const result = await collection.find(query).toArray();

        res.send({
            message: result,
        })
    } catch(e) {
        console.log(e);
        res.status(400).send({ msg: 'Internal Server Error' });
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