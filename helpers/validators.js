function createBookValidation(body){
    if (body.author === undefined || body.author.trim() === ''
        || body.country === undefined || body.country.trim() === ''
        || body.language === undefined || body.language.trim() === ''
        || body.title === undefined || body.title.trim() === ''){
            return {
                valid: false,
                message: 'missing data'
            }
        } else {
            return {
                valid: true,
                message: null,
            }
        }
}

function createUserValidation(body){
    if (body.email === undefined || body.email.trim() === ''){
        return {
            valid: false,
            message: 'missing email'
        }
    } else {
        return {
            valid: true,
            message: 'null',
        }
    }
}

module.exports = {
    createBookValidation,
    createUserValidation
}