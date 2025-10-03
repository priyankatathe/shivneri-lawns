const multer = require("multer")
const path = require("path")

const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        const fn = Date.now() + path.extname(file.originalname)
        cb(null, fn)
    }
})
exports.upload = multer({ storage }).single("image")

exports.uploadImage = multer({ storage }).fields([
    { name: "EventImage", maxCount: 1 },
    { name: "LogoImage", maxCount: 1 },
])
