var express = require('express')
var router = express.Router()

router.use("/users", require("./app/routes/userRoutes"))  
router.use("/hospital", require("./app/routes/hospitalRoutes")) 
module.exports = router
