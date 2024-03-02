const express = require("express");
const router = express.Router();

router.post('/upload', (req,res)=>{
    res.contentType = 'application/json';

    res.send({
        msg:"Test Example"
    })
});

module.exports = router;