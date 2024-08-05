const mongoose = require("mongoose")
const scheme = mongoose.Schema

const XeMays = new scheme({
    ten_xe_ph38086: { type: String, required: true },
    mau_Xe_ph38086: { type: String, required: true },
    gia_ban_ph38086: { type: Number, required: true, default: 0 },
    mo_ta_ph38086: { type: String },
    hinh_anh_ph38086: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('XeMay', XeMays)
//_ph38086