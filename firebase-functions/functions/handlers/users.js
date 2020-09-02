const { admin, db } = require("../util/admin");

const config = require("../util/config");
const {validationResult} = require('express-validator')



exports.signup = (req, res) => {
    const noImg = "no-img.png"
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle,
    }

    const errors = validationResult(req)

    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    

    
}