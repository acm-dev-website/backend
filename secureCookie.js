const crypto = require("crypto");
module.exports = class secureCookie {
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