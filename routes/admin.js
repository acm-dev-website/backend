const express = require("express");
const router = express.Router();
const mongo_utils = require('../utils/mongo_utils');
const file_utils = require('../utils/file_utils');
const path = require('path');

// Stuff for gridfsbucket, also set up multer as to use req.file.originalname
const multer = require("multer");
const { GridFSBucket, ObjectID } = require('mongodb');
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router.use(express.static("public"));

const {cookieAuthCheck} = require("../secureCookie.js");

router.use(express.static("public"));

const filePath = path.join(__dirname, '../views/');

router.get("/", cookieAuthCheck, (req, res)=>{
  res.sendFile(filePath+'admin.html',{});
})

router.post('/submit', cookieAuthCheck, file_utils.upload.single('image'), async (req, res) => {
  // Check to make sure all required fields have been filled out
  const name = req.body.name.trim();
  const date = req.body.date;
  const desc = req.body.description.trim();
  const imageName = req.file?.filename;

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
  try {
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
  }

  res.redirect('/admin');
});

module.exports = router;