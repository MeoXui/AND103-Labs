var nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "huynkph38086@fpt.edu.vn",
        pass: ""
    }
})

module.exports = transporter