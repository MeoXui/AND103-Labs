const mongoose = require("mongoose")
const scheme = mongoose.Schema

const Orders = new scheme({
    order_code: { type: String },
    id_user: { type: scheme.Types.ObjectId, ref: 'user' }
}, { timestamps: true })

module.exports = mongoose.model('order', Orders)