var crypto = require('crypto'),
    algorithm = sails.config.encryption.algo,
    key = sails.config.encryption.key;

/**
 * Following method is used to encrypt any plain text using
 * some symmetric encryption technique.
 *
 * @param  {Buffer} buffer Text buffer to encrypt
 * @return {Buffer}        Encrypted text buffer
 */
function encrypt(buffer) {
    var cipher = crypto.createCipher(algorithm, key)
    var crypted = Buffer.concat([cipher.update(buffer), cipher.final()]);
    return crypted;
}

/**
 * Following method is used to dencrypt any encrypted text using
 * some symmetric encryption technique.
 *
 * @param  {Buffer} buffer Text buffer to decrypt
 * @return {Buffer}        Decrypted text buffer
 */
function decrypt(buffer) {
    var decipher = crypto.createDecipher(algorithm, key)
    var dec = Buffer.concat([decipher.update(buffer), decipher.final()]);
    return dec;
}

module.exports.encrypt = encrypt;
module.exports.decrypt = decrypt;
