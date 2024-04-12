//controllers hold all the logic for the function
const path = require('path');
const filePath = path.join(__dirname, '../frontend/pages/');

//logic for frontend
exports.homePage = (req,res)=>{
    res.sendFile(filePath+'index/index.html');
}

exports.workshopPage = (req,res)=>{
    res.sendFile(filePath+'workshops/workshops.html');
}

exports.eventPage = (req,res)=>{
    res.sendFile(filePath+'events/events.html');
}

exports.calenderPage = (req,res)=>{
    res.sendFile(filePath+'calendar/calendar.html');
}

exports.importantLinkPage = (req,res)=>{
    res.sendFile(filePath+'important-links/important-links.html');
}

exports.leadershipPage = (req,res)=>{
    res.sendFile(filePath+'leadership/leadership.html');
}

exports.merchandisePage = (req,res)=>{
    res.sendFile(filePath+'merchandise/merchandise.html');
}

exports.projectPage = (req,res)=>{
    res.sendFile(filePath+'projects/projects.html');
}

exports.newBase = async (req,res)=>{
    return res.sendFile(filePath+'index/index.html');
}