const mongoose = require("mongoose")
mongoose.set("strictQuery", true)

const db_name = "/dbLab3"
const local = "mongodb://127.0.0.1:27017" + db_name
const atlas = "mongodb+srv://huynkph38086:huynkph38086@cluster0.g7bpwz7.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0" + db_name

const connect = async () => {
    try {
        await mongoose.connect(local)
        console.log('Kết nối thành công')
    } catch (error) {
        console.log(error)
        console.log('Kết nối thất bại')
    }
}

module.exports = { connect }