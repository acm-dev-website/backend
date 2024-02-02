const multer = require('multer');


//NOT WORKING LOOK INTO MUTLER
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        console.log('found file ',file.filename);
        cb(null, file.originalname)
    }
}) 

module.exports = {
    upload: multer({storage:storage})
}