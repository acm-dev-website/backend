const multer = require("multer");

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