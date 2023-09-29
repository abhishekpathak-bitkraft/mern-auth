const jwt = require('jsonwebtoken')
const JWT_SECRET = "abhishekhere"

const verifyUser = (req, res, next) => {
    // console.log(req)
    const barrerToken = req.header("Authorization");

    // console.log(barrerToken +" Barre rtoken")
    if (!barrerToken) {
        return res.status(400).json({
            success: false,
            message: "Invalid Token!"
        })
    }
    const token = barrerToken.split(" ");
    // console.log("token: "+token);
    const authToken = token[1];
    // console.log("authtoken: "+authToken)

    if(!authToken){
        return res.status(400).json({
            success: false,
            message: "Invalid Token"
        })
    }

    try {
        const data = jwt.verify(authToken, JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(200).json({ expired: true, success: false, message: 'Token expired here' });
            }
            req.user = decoded.user;
            next()
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({ status: 0, message: "Authenticate using valid token 1" });
    }
}

module.exports = verifyUser;