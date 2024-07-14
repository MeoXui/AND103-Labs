const mongoose = require("mongoose")
const scheme = mongoose.Schema

const Cars = new scheme({
    name: { type: String },
    price: { type: Number },
    status: { type: Number },
}, { timestamps: true })

module.exports = mongoose.model('car', Cars)