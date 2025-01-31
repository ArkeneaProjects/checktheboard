var express = require('express')
var router = express.Router()

router.use("/users", require("./app/routes/mobileApiRoutes"))  
module.exports = router
