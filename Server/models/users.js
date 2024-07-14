const mongoose = require("mongoose")
const scheme = mongoose.Schema

const Users = new scheme({
    username: { type: String, unique: true },
    password: { type: String },
    email: { type: String, unique: true },
    name: { type: String },
    avatar: { type: String },
    available: { type: Boolean, default: false}
}, { timestamps: true })

module.exports = mongoose.model('user', Users)