const {isValid} = require('swedish-personal-identity-number-validator');

function ssnValid(ssn){
    return isValid(ssn)
}