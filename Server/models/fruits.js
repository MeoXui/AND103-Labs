const mongoose = require("mongoose")
const scheme = mongoose.Schema

const Fruits = new scheme({
    name: { type: String },
    quantity: { type: Number },
    price: { type: Number },
    status: { type: Number },
    images: { type: Array },
    des: { type: String },
    id_distributor: { type: scheme.Types.ObjectId, ref: 'distributor' }
}, { timestamps: true })

module.exports = mongoose.model('fruit', Fruits)