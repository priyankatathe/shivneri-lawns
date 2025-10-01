const bcrypt = require("bcryptjs")
const validator = require("validator")
const asyncHandler = require("express-async-handler")
const { uploadImage } = require("../utils/upload")
const cloudinary = require("../utils/cloudinary.config")
const jwt = require("jsonwebtoken")
const Auth = require("../model/Auth")
const { checkEmpty } = require("../utils/checkEmpty")

exports.registerAdmin = asyncHandler(async (req, res) => {
    uploadImage(req, res, async (err) => {
        if (err) {
            return res.status(400).json({ message: "Unable To Upload Image", error: err });
        }

        const { name, email, password, mobile, title, role } = req.body;

        // ✅ Validation
        if (!name || !email || !password || !mobile || !title) {
            return res.status(400).json({ message: "All Fields Required" });
        }
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" });
        }
        if (!validator.isStrongPassword(password)) {
            return res.status(400).json({ message: "Provide Strong Password" });
        }
        if (mobile && !validator.isMobilePhone(mobile.toString(), "any")) {
            return res.status(400).json({ message: "Provide correct Phone Number" });
        }

        try {
            // ✅ Password hash
            const hash = await bcrypt.hash(password, 10);

            // ✅ Event Image Upload (Single)
            let eventurl = null
            let logourl = null

            if (req.files?.EventImage && req.files.EventImage[0]) {
                const { secure_url } = await cloudinary.uploader.upload(req.files.EventImage[0].path)
                eventurl = secure_url
            }
            if (req.files?.LogoImage && req.files.LogoImage[0]) {
                const { secure_url } = await cloudinary.uploader.upload(req.files.LogoImage[0].path)
                logourl = secure_url
            }




            // ✅ Create Admin in DB
            const result = await Auth.create({
                name,
                email,
                mobile,
                password: hash,
                title,
                EventImage: eventurl,
                LogoImage: logourl,
                role: role || "admin",
            })

            res.status(201).json({
                message: "Admin registered successfully",
                result,
            });
        } catch (error) {
            console.log("Register Error:", error);

            if (error.code === 11000) {
                const field = Object.keys(error.keyValue)[0];
                return res.status(400).json({ message: `${field} already exists` });
            }

            res.status(500).json({ message: "Something went wrong", error: error.message });
        }
    });
});





exports.loginAdmin = asyncHandler(async (req, res) => {

    const { email, password, } = req.body
    const { isError, error } = checkEmpty({ email, password })
    if (isError) {
        return res.status(400).json({ message: "All Fields Required", error })
    }


    try {
        if (!validator.isEmail(email)) {
            return res.status(400).json({ message: "Invalid Email" })
        }

        const result = await Auth.findOne({ email })
        if (!result) {
            return res.status(400).json({ message: "Invalid Email" })
        }
        const isVerify = await bcrypt.compare(password, result.password)
        if (!isVerify) {
            return res.status(400).json({ message: "Password do not match" })
        }

        const token = jwt.sign({ userId: result._id },
            process.env.JWT_KEY, { expiresIn: "15d" })
        res.cookie("admin", token, {
            maxAge: 15 * 24 * 60 * 60 * 1000,
            httpOnly: true
        })

        res.json({
            message: "admin login success.",
            result: {
                _id: result._id,
                name: result.name,
                email: result.email,
                mobile: result.mobile,
                image: result.image,
                role: result.role,
            }
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Internal Server Error" })

    }

})
exports.logoutAdmin = (req, res) => {
    res.clearCookie("admin")
    res.json({ message: "admin logout success" })
}

exports.fetchAdmin = asyncHandler(async (req, res) => {
    try {
        const result = await Auth.findOne({ _id: req.user })

        res.json({ message: "Admin fetch Success", result })
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server Error ", error: error.message })
    }

})

