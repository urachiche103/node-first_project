const bcrypt = require('bcryptjs');

async function encrypt(password){
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password,salt)
    return hash
}

async function checkup(hash,password){
    const result = await bcrypt.compare(password,hash)
    return result
}

module.exports = {
    encrypt,
    checkup,
}