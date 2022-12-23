export const REGEX = {
    REGDIGIT : /[0-9]$/, // REGEX pattern for 0-9 digits
    REGDIGITORNEG : /-|[0-9]$/, // REGEX that accepts either the negative sign or a number
    REGDAY : /^(0|[1-9][0-9]{0,9})$/, // REGEX pattern for positive integer or zero
    //  REGHOUR : /^(0[0-9]|1[0-9]|2[0-3])$/, // REGEX pattern valid between 00 - 23
    //  REGMINSEC : /^(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9])$/, // REGEX pattern valid between 00 - 59
    REGHOUR : /^([0-1]?[0-9]|2[0-3])$/, // REGEX pattern valid between 0 - 23 (00-09 are also valid)
    REGHOURFIRST : /[0-2]$/, // REGEX pattern for the first digit of an hour, 0-1-2
    REGMINSEC : /^([0-5]?[0-9])$/, // REGEX pattern valid minutes & seconds, between 0 - 59 (00-09 are also valid)
    REGMINSECFIRST : /[0-5]$/, // REGEX pattern for the first digit of the minute or second, 0-1-2-3-4-5
    //eslint-disable-next-line
    REGINT : /^\-?\d+$/, // REGEX pattern for Integer valdiation
    REGINT_COMMA : /^(?:\d{1,3}(?:,\d{3})*|\d+)$/, // REGEX pattern for integer with comma thousand seperators
    //eslint-disable-next-line
    REGFLOAT : /^[-+]?[0-9]*\.?[0-9]+$/, // REGEX pattern for signed float validation regex
    REGFLOAT_COMMA : /^(?:\d{1,3}(?:,\d{3})*|\d+)(?:\.\d+)?$/, //REGEX pattern for floats with comma thousand separators
    //eslint-disable-next-line
    REGSCIENTIFIC : /^[+\-]?(?=\.\d|\d)(?:0|[1-9]\d*)?(?:\.\d*)?(?:\d[eE][+\-]?\d+)?$/, // REGEX pattern for scientific notation like +3, 3.2e23, -4.70e+9, -.2E-4
    //eslint-disable-next-line
    REGDATEISO : /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/, // REGEX pattern valid ISO date format yyyy-mm-dd
    //eslint-disable-next-line
    REGIPV4 : /^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$/, // REGEX pattern to validate IPV4 address
    //eslint-disable-next-line
    EMAIL : /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, // REGEX to validate email addresses
}