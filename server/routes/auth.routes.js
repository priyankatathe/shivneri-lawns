const router = require("express").Router()

const { adminProtected } = require("../middleware/protected")
const authController = require("./../controller/Auth.controller")


router
    .post("/admin-register", authController.registerAdmin)
    .post("/admin-login", authController.loginAdmin)
    .post("/admin-logout", authController.logoutAdmin)
    .get("/admin-fetch", adminProtected, authController.fetchAdmin)

// ✅ Forgot password (send OTP)
router.post("/forgot-password", authController.forgotPassword)

// ✅ Reset password with OTP
router.post("/reset-password-otp", authController.resetPasswordWithOTP)



module.exports = router