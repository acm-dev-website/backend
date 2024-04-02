const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongo_utils = require('./utils/mongo_utils');
const cookieParser = require('cookie-parser');

const {PORT} = require('./Key.json');

app.use(cookieParser());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended:true }));

const rootRoute = require('./routes/rootRouter');
app.use('/', rootRoute);

const adminRoute = require('./routes/adminRouter');
app.use('/admin', adminRoute);

const apiRoute = require('./routes/apiRouter');
app.use('/api', apiRoute);

// const editRoute = require('./routes/editRouter');
// app.use('/edit', editRoute);

async function startUp(){
    await mongo_utils.connect_to_server();

    app.listen(PORT, ()=>{
        console.log("Server listening on port "+PORT);
        console.log(`http://localhost:${PORT}`)
    })
}

startUp();