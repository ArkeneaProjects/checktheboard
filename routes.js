var express = require('express')
var router = express.Router()

router.use("/users", require("./app/routes/userRoutes"))  
module.exports = router
