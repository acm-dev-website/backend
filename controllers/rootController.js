//controllers hold all the logic for the function
const path = require('path');
const {secureCookie} = require('../utils/secureCookie.js');
const mongo_utils = require('../utils/mongo_utils.js');
const {APIKey, ADMINPASS} = require('../Key.json');
const { calendar } = require('googleapis/build/src/apis/calendar/index.js');
const calendar_utils = require('../utils/calendar_utils.js');
const cookieCrypt = new secureCookie(APIKey);
const filePath = path.join(__dirname, '../views/');


exports.base = async (req,res)=>{
  // Check and see if auth cookie exists
  return res.sendFile(filePath+'loginPage.html',{});
};

//if this isn't working go into router and include bodyParser.urlencoded({extended:true}) as middleware
// -jake
exports.login = async (req,res)=>{
  // Check if password is correct
  console.log("login");
  if(req.body.password !== ADMINPASS) 
      return res.redirect('/');

  // Encrypt cookie
  const auth = cookieCrypt.encrypt((new Date()).toString());
  // Set cookie
  res.cookie('auth',auth,{httpOnly:true});

  return res.redirect('/admin');
}

/** 
 * For use with collecting emails from the front-end and adding them to the calendar list
*/

exports.email = async (req, res) => {

    //const email = req.body.email;

    const db = mongo_utils.get_client().db();
    const collection = db.collection("people");

    //console.log(result);
    //calendar_utils.get();
}
