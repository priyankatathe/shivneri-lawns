const router = require("express").Router()

const { adminProtected } = require("../middleware/protected")
const authController = require("./../controller/Auth.controller")


router
    .post("/admin-register", authController.registerAdmin)
    .post("/admin-login", authController.loginAdmin)
    .post("/admin-logout", authController.logoutAdmin)

    //reset and forget password
    .post("/forgot-password", authController.forgotPassword)
    .post("/reset-password/:token", authController.resetPassword)

    .get("/admin-fetch", adminProtected, authController.fetchAdmin)



module.exports = router