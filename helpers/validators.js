
function validateCreateBook(body){
    if (body.author === undefined
        || body.country.trim() === ""
        || body.language === undefined
        || body.pages.trim() === ""
        || body.title === undefined
        || body.year === undefined) {
        return {
            valid: false,
            message: "missing author or title"
        }
    } else {
        return {
            valid: true,
            message: null,
        }
    }
}

module.exports = {
    validateCreateBook,
}