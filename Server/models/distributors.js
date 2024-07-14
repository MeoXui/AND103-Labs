const mongoose = require("mongoose")
const scheme = mongoose.Schema

const Distributors = new scheme({
    name: { type: String, unique: true }
}, { timestamps: true })

module.exports = mongoose.model('distributor', Distributors)