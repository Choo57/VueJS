import {REGEX} from '../hooks/globalRegex.js';

export default function useValidate(type, value, fieldName, customMessage="") {
// Shared form validation function
//   type: type of the input to validate, e.g. integer, string, email, checkbox
//   value: value that will be validated
//   fieldName: name of the field that is being validated. Will be used in the validation message displayed to the user
//   customMessage: custom error message that should be displayed. Only usedfor checkbox's at the moment. Defaults to an empty string if not specificed by the caller.
    switch (type) {
        case 'int':
            if ( REGEX.REGINT.test(value) ) { 
              return {valid:true, msg:""};
            } else {
              return {valid:false, msg: value + " is not a valid number"};
            }
        case 'string':
            if (value.length == 0) {
                return {valid:false, msg: fieldName + " cannot be empty"};
            } else {
                return {valid:true, msg:""}; 
            }
        case 'email':
            if (value === '') {
                return {valid:false, msg: fieldName + " cannot be empty"};
            }
            else if ( REGEX.EMAIL.test(value) ) { 
                return {valid:true, msg:""};
            } else {
                return {valid:false, msg: value + " is not a valid email"};
            }
        case 'checkbox':
            if (value) {
                return {valid:true, msg:""}; 
            } else {
                if (customMessage) {
                    return {valid:false, msg:customMessage}; 
                } else {
                    return {valid:false, msg:"Please check this box in order to proceed"};
                }
            }
        default:
          console.log('Unknown setting type: ' + type);
          return {valid:true, msg:""}; 
    }
}