const multer = require("multer")

const _storage = multer.diskStorage({
    destination: (res, file, cb) => {
        cb(null, "public/images")
    },
    filename: (res, file, cb) => {
        cb(null, file.fieldname + "-" + Date.now() + file.originalname)
    }
})

const upload = multer({ storage: _storage })
module.exports = upload