const MongoClient = require("mongodb").MongoClient;
const GridFSBucket = require("mongodb").GridFSBucket;
const fs = require("fs");
const file_utils = require("./file_utils");

const {APIKey} = require('../Key.json');
const url = `mongodb+srv://developer:${APIKey}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;

var _client;
var _bucket;
var _connected = false;

module.exports = {
    // Changed to try function, had issues with server not properly connecting when trying to use multer, look into reverting to arrow function
    connect_to_server: async function() {
        try {
            // Changed client and bucket init
            _client = await MongoClient.connect(url, {});
            _bucket = new GridFSBucket(_client.db());
            _connected = true;
            console.log('Connection successful');
        } catch (error) {
            console.error('Error connecting to MongoDB:', error);
            _connected = false;
        }
    },
    /**
     * Get the mongo client
     * @returns {MongoClient} client
     */
    get_client: function(){
        return _client;
    },

    get_connection: function(){
        return _connected;
    },

    /**
     * Get the client's GridFS bucket
     * @returns {GridFSBucket} bucket
     */
    get_bucket: function() {
        return _bucket;
    },

    /**
     * Uploads `file_path` to the database
     * @param {string} file_path 
     * @returns boolean
     */
    upload_file: function(file_path) {
        const filename = file_path.split("/images/")[1];
        const image_upload_stream = this.get_bucket().openUploadStream(filename);
        const image_read_stream = fs.createReadStream(file_path);
        image_read_stream.pipe(image_upload_stream);

        image_read_stream.on("close", ()=>{
            console.log("closing file");
            file_utils.remove_file(file_path);
            console.log("upload for " + filename + " finished");
        });
        

        return true;
    }
};