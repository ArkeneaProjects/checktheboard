export const regex = {
  pattern: {
    EMAIL: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    EMAIL_TWO: /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/,
    // PASSWORD: /^(?=(?:[^a-z]*[a-z]){2})(?=(?:[^0-9]*[0-9]))(?=.*[!-\/:-@\[-`{-~]).{8,16}$/,
    PASSWORD: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&!-\/:-^\[-`{-~]{8,64}$/,
    NAME: "^[a-zA-Z ]*$",
    PHONE: /^(\([0-9]{3}\) |[0-9]{3}-)[0-9]{3}-[0-9]{4}$/,
    FIRST_LETTER_CAPITALIZE: /(^|[.!?]\s+)([a-z])/g,
    ZIPCODE: /^[0-9]{5,}\d*$/,
    COMPANY_NAME: /^[a-zA-Z0-9!@#$&()\\-`.+,/\" ]*$/,
    WEBLINK: /^(?:(?:(?:https?|ftp):)?\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:[/?#]\S*)?$/,
    TERMS: /true*/

  },
}