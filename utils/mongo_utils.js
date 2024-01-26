const MongoClient = require( 'mongodb' ).MongoClient;

const {APIKey} = require('../Key.json');
const url = `mongodb+srv://developer:${APIKey}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;

var _client;
var _connected = false;

module.exports = {
    connect_to_server: async function() {
        await MongoClient.connect( url, {}).then(client=>{
            console.log('connection sucessful');
            _client = client;
            _connected = true;
        }).catch(err=>{
            console.log(err);
            _client = 0;
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
    }
};