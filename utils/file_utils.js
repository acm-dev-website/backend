const multer = require("multer");
const fs = require("fs");

//NOT WORKING LOOK INTO MUTLER
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'images/')
    },
    filename: function (req, file, cb) {
        console.log('found file ',file.filename);
        cb(null, file.originalname)
    }
});

function remove_file(file_path) {
    fs.unlink(file_path, (err) => {
        if (err)
            throw err;
        console.log(file_path + " was deleted");
    });
}

module.exports = {
    upload: multer({storage:storage}),
    remove_file: remove_file
};