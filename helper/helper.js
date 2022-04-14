const CONFIG = require('../config/config')
var crypto = require('crypto'),
    algorithm = 'aes-256-ctr',
    password = 'd6F3Efeq3hd6f3'
let key = crypto.createHash('sha256').update(String(password)).digest('base64').substr(0, 32)
const iv = Buffer.alloc(16, 0)
const salt = crypto.randomBytes(16).toString("hex")
const CryptJS = require('crypto-js')


/**
 * 
 * @param password
 * @returns {Promise<void>}
 */
 module.exports.hash = async (password) => {
    return new Promise((resolve, reject) => {

        return crypto.scrypt(password, salt, 64, (err, derivedKey) => {
            if (err) reject(err)
            //console.log(salt + ":" + derivedKey.toString('hex'))
            return resolve(salt + ":" + derivedKey.toString('hex'))
        });
    });
}

/**
 * Password Verification
 * @param password
 * @param hashed
 * @returns {Promise<void>}
 */
 module.exports.verify = async (password, hashed) => {
    return new Promise((resolve, reject) => {
        const [dSalt, key] = hashed.split(":")
        crypto.scrypt(password, dSalt, 64, (err, derivedKey) => {
            if (err) reject(err)
            return resolve(key === derivedKey.toString('hex'))
        });
    })
}

/* generate encrypt password   */
module.exports.encrypt = function (text) {
    var cipher = crypto.createCipheriv(algorithm, key, iv);
    var crypted = cipher.update(text, 'utf8', 'hex')
    crypted += cipher.final('hex');
    return crypted;
}

/* generate decrypt password   */
module.exports.decrypt = function (text) {
    var decipher = crypto.createDecipheriv(algorithm, key, iv)
    var dec = decipher.update(text, 'hex', 'utf8')
    dec += decipher.final('utf8');
    return dec;
}

/* get random password   */
module.exports.getRandomPassword = function (length = 8) {
    
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;

}

module.exports.generateReferenceNumber = () => {
    return `BT ${Math.random().toString(36).substring(2,30).toUpperCase()}`
}

