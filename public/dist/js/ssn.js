const {isValid} = require('../../../node_modules/swedish-personal-identity-number-validator');
function ssnValid(ssn){
    console.log("WEWE");
    return isValid(ssn);
}