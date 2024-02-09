const multer = require("multer");

// //NOT WORKING LOOK INTO MUTLER
// var storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'images/')
//     },
//     filename: function (req, file, cb) {
//         console.log('found file ',file.filename);
//         cb(null, file.originalname)
//     }
// });


// Configure Multer for memory storage
const storage = multer.memoryStorage();

// Multer upload middleware configured for memory storage
const upload = multer({ storage: storage });

function remove_file(file_path) {
    fs.unlink(file_path, (err) => {
        if (err)
            throw err;
        console.log(file_path + " was deleted");
    });
}

module.exports = {
    upload: upload,
    remove_file: remove_file
};