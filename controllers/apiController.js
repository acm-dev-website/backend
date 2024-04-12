const mongo_utils = require('../utils/mongo_utils');

//fetch/events [get]
//fetchs events and allows all events to be fetched at once or by field
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

        const result = await collection.find(query, { projection: { _id : 0 } }).toArray();

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
        //setup mongo config
        const db = mongo_utils.get_client().db();
        const collection = db.collection('images.files');
        //fetch image from database
        const result = await collection.findOne({filename:req.params.img_name});
        
        if(result==null){
            throw "image does not exist";
        }
        //pipe data to frontend
        const bucket = mongo_utils.get_bucket();
        const downloadStream = bucket.openDownloadStream(result._id);
        
        downloadStream.pipe(res);
    }catch(e){
        console.log(e);
        res.status(404).send({msg:'error'});
        return;
    }
}