const crypto = require("crypto");

const {APIKey} = require('../Key.json');
class secureCookie {
    constructor(key) {
        // Digest key as sha-512 hash
        this.key = crypto.createHash("sha512").update(key).digest().slice(0,32);

    }
    /**
     * 
     * @param {string} text text to encrypt
     * @returns string the data that's encrypted
     */
    encrypt(text) {
        const IV = crypto.randomBytes(16);
        let cipher = crypto.createCipheriv('aes-256-gcm', this.key, IV);
        let encrypted = IV.toString('hex');
        encrypted += cipher.update(text, 'utf8', 'hex');
        encrypted += cipher.final('hex');
        encrypted += cipher.getAuthTag().toString('hex');
        return encrypted;
    }
    /**
     * 
     * @param {string} text text to decrypt
     * @returns string the data that's decrypted
     */
    decrypt(text) {
        const IV = Buffer.from(text.slice(0,32),'hex');
        text = text.slice(32);
        const authTag = Buffer.from(text.slice(text.length-32),'hex');
        text = text.slice(0,text.length-32);
        let decipher = crypto.createDecipheriv('aes-256-gcm', this.key, IV);
        decipher.setAuthTag(authTag);
        let decrypted = decipher.update(text, 'hex', 'utf8');
        decrypted += decipher.final('utf8');
        return decrypted;
    }
}

const cookieAuthCheck = (req, res, next) => {
  const cookieCrypt = new secureCookie(APIKey);
  // Check and see if auth cookie exists
  if(!req.cookies.auth) 
      return res.status(401).redirect('/');
  
      try {
      // Decrypt cookie
      const TSCookie = cookieCrypt.decrypt(req.cookies.auth);
      const TS = new Date(TSCookie);

      // check if the TSCookie is expired (24 hours)
      if(TS.getTime() + 1000*60*60 < new Date().getTime()) {
          // If expired, delete cookie and send login page
          res.clearCookie('auth');
          return res.status(401).redirect('/');
      }
      // Update cookie timestamp
      res.cookie('auth',cookieCrypt.encrypt((new Date()).toString()),{httpOnly:true});
      next();
  } catch(ex) {
      // If cookie is invalid, delete cookie and send login page
      res.clearCookie('auth');
      return res.status(401).redirect('/');
  }
}

module.exports = {secureCookie, cookieAuthCheck};