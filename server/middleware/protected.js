const jwt = require("jsonwebtoken")

exports.adminProtected = (req, res, next) => {
    const { admin } = req.cookies
    if (!admin) {
        return res.status(401).json({ messae: "No Cookie Found" })
    }
    // token verify
    jwt.verify(admin, process.env.JWT_KEY, (error, decode) => {
        if (error) {
            console.log(error)
            return res.status(401).json({ message: "Invalid Token" })

        }
        req.user = { _id: decode.userId }
        next()
    })
}



