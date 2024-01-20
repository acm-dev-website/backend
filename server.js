const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo_utils = require('./utils/mongo_utils');

const cookieParser = require('cookie-parser');

const {PORT} = require('./Key.json');

app.set('view engine','ejs');
app.use(cookieParser());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const rootRoute = require('./routes/root');
app.use('/', rootRoute);

const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

async function startUp(){
    await mongo_utils.connect_to_server();

    app.listen(PORT, ()=>{
        console.log("Server listening on port "+PORT);
        console.log(`http://localhost:${PORT}`)
    })
}

startUp();