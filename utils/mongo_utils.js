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
    connect_to_server: async function() {
        await MongoClient.connect( url, {}).then(client=>{
            console.log('connection sucessful');
            _client = client;
            _bucket = new GridFSBucket(client.db());
            _connected = true;
        }).catch(err=>{
            console.log(err);
            _client = 0;
            _bucket = 0;
        });
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