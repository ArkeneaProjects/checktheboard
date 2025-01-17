var helper = {}

//function to format data before sending it to frontend
helper.rError = function (msg) {
    return { status: "error", data: msg }
}

helper.rSuccess = function (data = null) {
    let res = { status: "success" }
    if (data) {
        res.data = data
    }
    return res
}

//Make first lettter Capital
helper.capitalize = function (str) {
    if (str && str != "") {
        var firstLetter = str.substr(0, 1);
        return firstLetter.toUpperCase() + str.substr(1);
    } else {
        return " "
    }
}

module.exports = helper
