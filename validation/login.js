const Validator = require("validator");
const validText = require('./valid-text');

module.exports = function(data) {
    let errors = {};

    data.email = validText(data.email) ? data.email : '';
    data.password = validText(data.password) ? data.password : '';

    // check if email is correct format
    if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    }
    
    if (Validator.isEmpty(data.password)) {
        errors.passowrd = "Password field is required";
    }

    return {
        errors,
        isValid: Object.keys(errors).length === 0
    }
}