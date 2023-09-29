const express = require("express");
const { body, validationResult } = require("express-validator")
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const connection = require("../db/dbConnect");
const verifyUser = require("../middlewares/verifyUser");
const router = express.Router();
const JWT_SECRET = "abhishekhere"


router.get("/", (req, res) => {
    res.json({
        message: "Sent"
    })
})

router.post("/register", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid Password').isLength({ min: 2 })
], async (req, res) => {

    let errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors
        })
    }
    const { name, email, password } = req.body;

    try {

        let sqlQuery = `SELECT COUNT(*) AS count FROM user WHERE email=? `
        connection.query(sqlQuery, [email], (error, results) => {

            if (error) {
                // console.log(error)
                return res.status(400).json({
                    success: false,
                    message: "Try later"
                })
            }
            const count = results[0].count;

            if (count == 0) {
                let sqlInsertQuery = `INSERT INTO user(name, email, password) VALUES (?)`;

                const salt = bcrypt.genSaltSync(10);
                const securedPassword = bcrypt.hashSync(password, salt);
                const VALUES = [name, email, securedPassword]
                connection.query(sqlInsertQuery, [VALUES], (err, result) => {
                    if (err) {
                        // console.log(err)
                        return res.status(400).json({
                            success: false,
                            message: "Try Later"
                        })
                    } else if (result) {
                        return res.status(201).json({
                            success: true,
                            message: "user registred"
                        })
                    }
                })

            } else {
                return res.status(409).json({ success: false, message: "User already exists" })
            }
        });
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
})

router.post("/login", [
    body('password', 'Enter a valid Password').isLength({ min: 2 }),
    body('email', 'Enter a valid email').isEmail()
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            message: errors
        })
    }

    const { email, password } = req.body;

    try {
        const userQuery = `SELECT * FROM user WHERE email = ?`;

        connection.query(userQuery, [email], async (error, result) => {
            if (error) {
                return res.status(403).json({
                    success: false,
                    message: "Check credentials"
                })
            }
            if (result.length == 0) {
                return res.status(400).json({
                    success: false,
                    message: "Check credentials"
                })
            }
            else {
                // console.log(result[0])
                let securedPassword = result[0].password;
                let checkPassword = await bcrypt.compare(password, securedPassword)
                if (checkPassword) {
                    // correct password
                    let fetchUserId = `SELECT id FROM user WHERE email=?`;
                    connection.query(fetchUserId, [email], (err, result) => {
                        if (err) {
                            return res.status(400).json({ error: "Internal server occured" })
                        }
                        if (result) {
                            let userId = result[0].id;
                            const data = {
                                user: {
                                    id: userId
                                }
                            }
                            let authtoken = jwt.sign(data, JWT_SECRET,{expiresIn:"1m"});
                            return res.status(200).json({ success:  true, message: authtoken })
                        }
                    })
                } else {
                    // Incorrect Password
                    return res.status(400).json({
                        success: false,
                        message: "Check credentials"
                    })
                }
            }
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Internal server error!"
        })
    }

})


router.get("/get-user",verifyUser ,(req, res) => {
    let userId = req.user.id;

    try {
        let userDataQuery = `SELECT name, email FROM user WHERE id=?`;

        connection.query(userDataQuery,[userId],(error, result)=>{
            if(error){
                console.log(error);
                return res.status(400).json({
                    success: false,
                    message:"try later"
                })
            }else if(result){
                // console.log("success")
                // console.log(result[0]);
                return res.status(200).json({
                    success: true,
                    message: result[0]
                })
            }else{
                // console.log(error);
                return res.status(500).json({
                    success: false,
                    message:"Internal server error!"
                })   
            }
        })
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Internal server error!"
        })   
    }
})

module.exports = router;