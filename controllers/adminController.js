const mongo_utils = require('../utils/mongo_utils');
const path = require('path');

//const ObjectId = require('mongodb').ObjectID;

// Stuff for gridfsbucket, also set up multer as to use req.file.originalname
const multer = require("multer");
const { GridFSBucket, ObjectID } = require('mongodb');
const storage = multer.memoryStorage();

const filePath = path.join(__dirname, '../views/');
/**
 * render admin html
 * @param {Express.Request} req 
 * @param {Express.Response} res 
 */
exports.render = async(req, res)=>{
    res.sendFile(filePath+'admin.html',{});
}

exports.create = async (req, res)=>{
  console.log(req.body);
  try{
    const name = req.body.name.trim();
    const date = req.body.date;
    const desc = req.body.description.trim();
    const imageName = req.file.originalname;

    if (!req.body.name || !req.body.date || !req.body.description) {
        res.status(400).redirect("/admin");
        return;
    }

    const Event = {
        name:name,
        date:date,
        description:desc,
        imageName: imageName
    };

    // Send to DB
    const db = mongo_utils.get_client().db();
    const collection = db.collection('events');

    const result = await collection.insertOne(Event);


    //// OLD METHOD
    // mongo_utils.upload_file("./images/" + imageName);
    //Use of bucket and multer
    const bucket = new GridFSBucket(db, { bucketName: 'images' });
    const uploadStream = bucket.openUploadStream(req.file.originalname);
    uploadStream.end(req.file.buffer);

    console.log(result);
    }
    catch(err) {
        res.status(400).json({message: err.message});
        return;
    }
    res.redirect('/admin');
}

// Delete event by name
exports.deleteEvent = async (req,res)=>{

  const eventName = req.query.eventName; // Specify the name of the event to delete
  const currentEventImgName = req.query.imgName;
  console.log(req.query.eventName);
  console.log(req.query.imgName);
  console.log(`Deleting event with name: ${eventName}`);

  try {
    const db = mongo_utils.get_client().db();
    
    const imgCollection = db.collection('images.files')
    const imgId = await imgCollection.findOne({filename : currentEventImgName})._id;
    const imgResult = await imgCollection.deleteOne({ filename : currentEventImgName });

    const chunksCollection = db.collection('images.chunks')
    const chunksResult = await chunksCollection.deleteMany({ files_id : imgId });

    const collection = db.collection('events');
    const result = await collection.deleteOne({ name : eventName });
    
    console.log(result);

    if (result.deletedCount === 1 && imgResult.deletedCount == 1) {
      // Event successfully deleted
      res.status(200).json({ message: 'Event deleted successfully' });
    } else {
      // Event not found
      res.status(404).json({ message: 'Event not found' });
    }
  } catch (err) {
    // Error handling
    res.status(500).json({ message: err.message });
  }
}