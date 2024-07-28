var express = require('express')
var router = express.Router()

const Users = require("../models/users")
const Distributors = require("../models/distributors")
const Fruits = require("../models/fruits")
const Cars = require("../models/cars")

const Upload = require('../config/common/upload')
const Transporter = require('../config/common/mail')

const JWT = require('jsonwebtoken')
const SECRETKEY = "FPTPOLYTECHNIC"

let token
let refreshToken

//GET
router.get("/users", async (req, res) => {
    try {
        const data = await Users.find().sort({ createdAt: -1 })
        if (data) {
            res.json({
                "status": 200,
                "mess": "Danh sách người dùng",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Danh sách trống hoặc lấy dữ liệu thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/distributors", async (req, res) => {
    try {
        const data = await Distributors.find().sort({ createdAt: -1 })
        if (data) {
            res.json({
                "status": 200,
                "mess": "Danh sách nhà phân phối",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Danh sách trống hoặc lấy dữ liệu thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/fruits", async (req, res) => {
    let payload
    if (token) {
        JWT.verify(token, SECRETKEY, (err, _payload) => {
            if (err instanceof JWT.JsonWebTokenError) return res.sendStatus(402)
            if (err) return res.sendStatus(403)
            payload = _payload
        })
    } else if (refreshToken) {
        JWT.verify(refreshToken, SECRETKEY, (err, _payload) => {
            if (err instanceof JWT.JsonWebTokenError) return res.sendStatus(402)
            if (err) return res.sendStatus(403)
            payload = _payload
        })
    }
    else { return res.sendStatus(401) }
    console.log(payload)

    try {
        const data = await Fruits.find().populate('id_distributor').sort({ createdAt: -1 })
        if (data) {
            res.json({
                "status": 200,
                "mess": "Danh sách trái cây",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Danh sách trống hoặc lấy dữ liệu thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/cars", async (req, res) => {
    let payload
    if (token) {
        JWT.verify(token, SECRETKEY, (err, _payload) => {
            if (err instanceof JWT.JsonWebTokenError) return res.sendStatus(402)
            if (err) return res.sendStatus(403)
            payload = _payload
        })
    } else if (refreshToken) {
        JWT.verify(refreshToken, SECRETKEY, (err, _payload) => {
            if (err instanceof JWT.JsonWebTokenError) return res.sendStatus(402)
            if (err) return res.sendStatus(403)
            payload = _payload
        })
    }
    else { return res.sendStatus(401) }
    console.log(payload)

    try {
        const data = await Cars.find().sort({ createdAt: -1 })
        if (data) {
            res.json({
                "status": 200,
                "mess": "Danh sách xe ô tô",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Danh sách trống hoặc lấy dữ liệu thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

//GET by ID
router.get("/user_id:id", async (req, res) => {
    try {
        const { id } = req.params
        const data = await Users.findById(id)
        res.json({
            "status": 200,
            "mess": `Người dùng ${id}`,
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/distributor_id:id", async (req, res) => {
    try {
        const { id } = req.params
        const data = await Distributors.findById(id)
        res.json({
            "status": 200,
            "mess": `Nhà phân phối ${id}`,
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/fruit_id:id", async (req, res) => {
    try {
        const { id } = req.params
        const data = await Fruits.findById(id).populate('id_distributor')
        res.json({
            "status": 200,
            "mess": `Trái cây ${id}`,
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/car_id:id", async (req, res) => {
    try {
        const { id } = req.params
        const data = await Cars.findById(id)
        res.json({
            "status": 200,
            "mess": `Xe ${id}`,
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

//GET search

router.get("/search_users", async (req, res) => {
    // try {
    //     const data = await Users.find().sort({createdAt: -1})
    //     if (data) {
    //         res.json({
    //             "status": 200,
    //             "mess": "Danh sách người dùng",
    //             "data": data
    //         })
    //     } else {
    //         res.json({
    //             "status": 400,
    //             "mess": "Danh sách trống hoặc lấy dữ liệu thất bại",
    //             "data": []
    //         })
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
})

router.get("/search_distributors", async (req, res) => {
    try {
        const key = req.query.key
        const data = await Distributors.find({ name: { $regex: `${key}`, $options: "i" } }).sort({ createdAt: -1 })
        if (data) {
            res.json({
                "status": 200,
                "mess": "Đã tìm thấy",
                "data": data
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Tìm thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.get("/search_fruits", async (req, res) => {
    let payload
    if (token) {
        JWT.verify(token, SECRETKEY, (err, _payload) => {
            if (err instanceof JWT.JsonWebTokenError) return res.sendStatus(402)
            if (err) return res.sendStatus(403)
            payload = _payload
        })
    } else if (refreshToken) {
        JWT.verify(refreshToken, SECRETKEY, (err, _payload) => {
            if (err instanceof JWT.JsonWebTokenError) return res.sendStatus(402)
            if (err) return res.sendStatus(403)
            payload = _payload
        })
    }
    else { return res.sendStatus(401) }
    console.log(payload)

    // try {
    //     const data = await Fruits.find().populate('id_distributor').sort({createdAt: -1})
    //     if (data) {
    //         res.json({
    //             "status": 200,
    //             "mess": "Danh sách trái cây",
    //             "data": data
    //         })
    //     } else {
    //         res.json({
    //             "status": 400,
    //             "mess": "Danh sách trống hoặc lấy dữ liệu thất bại",
    //             "data": []
    //         })
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
})

router.get("/search_cars", async (req, res) => {
    let payload
    if (token) {
        JWT.verify(token, SECRETKEY, (err, _payload) => {
            if (err instanceof JWT.JsonWebTokenError) return res.sendStatus(402)
            if (err) return res.sendStatus(403)
            payload = _payload
        })
    } else if (refreshToken) {
        JWT.verify(refreshToken, SECRETKEY, (err, _payload) => {
            if (err instanceof JWT.JsonWebTokenError) return res.sendStatus(402)
            if (err) return res.sendStatus(403)
            payload = _payload
        })
    }
    else { return res.sendStatus(401) }
    console.log(payload)

    // try {
    //     const data = await Cars.find().sort({createdAt: -1})
    //     if (data) {
    //         res.json({
    //             "status": 200,
    //             "mess": "Danh sách xe ô tô",
    //             "data": data
    //         })
    //     } else {
    //         res.json({
    //             "status": 400,
    //             "mess": "Danh sách trống hoặc lấy dữ liệu thất bại",
    //             "data": []
    //         })
    //     }
    // } catch (error) {
    //     console.log(error)
    // }
})

//extra GET
router.get("/fruits_in_price", async (req, res) => {
    try {
        const { minP, maxP } = req.query
        const query = { price: { $gte: minP, $lte: maxP } }
        const data = await Fruits.find(query, 'name price')
            .populate('id_distributor')
            .sort({ quantity: -1 })
            .skip(0)
            .limit(2)
        res.json({
            "status": 200,
            "mess": "Danh sách trái cây",
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

router.get("/fruits_have_A_or_X", async (req, res) => {
    try {
        const query = {
            $or: [
                { name: { $regex: 'A' } },
                { name: { $regex: 'X' } },
                { name: { $regex: 'a' } },
                { name: { $regex: 'x' } },
                { name: { $regex: 'á' } },
                { name: { $regex: 'à' } },
                { name: { $regex: 'ả' } },
                { name: { $regex: 'ã' } },
                { name: { $regex: 'ạ' } },
                { name: { $regex: 'Á' } },
                { name: { $regex: 'À' } },
                { name: { $regex: 'Ả' } },
                { name: { $regex: 'Ã' } },
                { name: { $regex: 'Ạ' } },
            ]
        }
        const data = await Fruits.find(query, 'name price')
            .populate('id_distributor')
        res.json({
            "status": 200,
            "mess": "Danh sách trái cây",
            "data": data
        })
    } catch (error) {
        console.log(error)
    }
})

//POST
router.post('/register', Upload.single('avatar'), async (req, res) => {
    try {
        const data = req.body;
        const { file } = req
        const newUser = Users({
            username: data.username,
            password: data.password,
            email: data.email,
            name: data.name,
            avatar: `${req.protocol}://${req.get("host")}/images/${file.filename}`,
            available: true,
        })
        const result = await newUser.save()
        if (result) {
            // const mailOptions = {
            //     from: "huynkph38086@fpt.edu.vn",
            //     to: data.email,
            //     subject: "Đăng ký thành công",
            //     text: "Cảm ơn bạn đã đăng ký"
            // };
            // await Transporter.sendMail(mailOptions);

            res.json({
                "status": 200,
                "mess": "Đăng ký thành công",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Đăng ký thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const query = {
            $or: [
                {
                    $and: [
                        { username: { $regex: `${username}` } },
                        { password: { $regex: `${password}` } }
                    ]
                },
                {
                    $and: [
                        { email: { $regex: `${username}` } },
                        { password: { $regex: `${password}` } }
                    ]
                }
            ]
        }
        const user = (await Users.find(query))[0]

        if (user && user.available) {
            token = JWT.sign({ userId: user._id }, SECRETKEY, { expiresIn: '1h' });
            refreshToken = JWT.sign({ userId: user._id }, SECRETKEY, { expiresIn: '1d' })
            res.json({
                "status": 200,
                "mess": "Đăng nhập thành công",
                "data": user,
                "token": token,
                "refreshToken": refreshToken
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Đăng nhập thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error);
    }
})

router.post("/add_distributor", async (req, res) => {
    try {
        const data = req.body
        const anew = new Distributors({ name: data.name })
        const result = await anew.save()
        if (result) {
            res.json({
                "status": 200,
                "mess": "Đã thêm nhà phân phối",
                "reqdata": data,
                "resdata": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Thêm thất bại",
                "reqdata": data,
                "resdata": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/add_fruit", Upload.array('images', 5), async (req, res) => {
    try {
        const data = req.body
        const { files } = req
        const urlsImage = files.map((file) => `${req.protocol}://${req.get("host")}/images/${file.filename}`)
        const anew = new Fruits({
            name: data.name,
            quantity: data.quantity,
            price: data.price,
            status: data.status,
            images: urlsImage,
            des: data.des,
            id_distributor: data.id_distributor
        })
        const result = await anew.save()
        if (result) {
            res.json({
                "status": 200,
                "mess": "Đã thêm trái cây",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Thêm thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.post("/add_car", Upload.array('images', 5), async (req, res) => {
    try {
        const data = req.body
        const { files } = req
        files.map((file) => `${req.protocol}://${req.get("host")}/images/${file.filename}`)
        const urlsImage = files
        const anew = new Cars({
            name: data.name,
            price: data.price,
            status: data.status,
            images: urlsImage
        })
        const result = await anew.save()
        if (result) {
            res.json({
                "status": 200,
                "mess": "Đã thêm xe ô tô",
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Thêm thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

//PUT
router.put("/update_user_id:id", Upload.single('avatar'), async (req, res) => {
    try {
        const { id } = req.params
        const { file } = req
        const olddata = await Users.findById(id)
        const newdata = req.body
        let result = null
        if (olddata) {
            olddata.username = newdata.username ?? olddata.username
            olddata.password = newdata.password ?? olddata.password
            olddata.email = newdata.email ?? olddata.email
            olddata.name = newdata.name ?? olddata.name
            olddata.avatar = newdata.avatar ? `${req.protocol}://${req.get("host")}/images/${file.filename}` : olddata.avatar
            olddata.available = newdata.available ?? olddata.available
            result = await olddata.save()
        }
        if (result) {
            res.json({
                "status": 200,
                "mess": `Đã cập nhận người dùng ${id}`,
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Cập nhận thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put("/update_distributor_id:id", async (req, res) => {
    try {
        const { id } = req.params
        const olddata = await Distributors.findById(id)
        const newdata = req.body
        let result = null
        if (olddata) {
            olddata.name = newdata.name ?? olddata.name
            result = await olddata.save()
        }
        if (result) {
            res.json({
                "status": 200,
                "mess": `Đã cập nhận nhà phân phối ${id}`,
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Cập nhận thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put("/update_fruit_id:id", Upload.array('images', 5), async (req, res) => {
    try {
        const { id } = req.params
        const { files } = req
        const urlsImage = files.map((file) => `${req.protocol}://${req.get("host")}/images/${file.filename}`)
        const olddata = await Fruits.findById(id).populate('id_distributor')
        const newdata = req.body
        let result = null
        if (olddata) {
            olddata.name = newdata.name ?? olddata.name
            olddata.quantity = newdata.quantity ?? olddata.quantity
            olddata.price = newdata.price ?? olddata.price
            olddata.status = newdata.status ?? olddata.status
            olddata.images = urlsImage ?? olddata.images
            olddata.des = newdata.des ?? olddata.des
            olddata.id_distributor = newdata.id_distributor ?? olddata.id_distributor
            result = await olddata.save()
        }
        if (result) {
            res.json({
                "status": 200,
                "mess": `Đã cập nhận trái cây ${id}`,
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Cập nhận thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.put("/update_car_id:id", Upload.array('images', 5), async (req, res) => {
    try {
        const { id } = req.params
        const { files } = req
        const urlsImage = files.map((file) => `${req.protocol}://${req.get("host")}/images/${file.filename}`)
        const olddata = await Cars.findById(id)
        const newdata = req.body
        let result = null
        if (olddata) {
            olddata.name = newdata.name ?? olddata.name
            olddata.price = newdata.price ?? olddata.price
            olddata.status = newdata.status ?? olddata.status
            olddata.images = urlsImage ?? olddata.images
            result = await olddata.save()
        }
        if (result) {
            res.json({
                "status": 200,
                "mess": `Đã cập nhận xe ${id}`,
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Cập nhận thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

//DELETE
router.delete("/delete_user_id:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await Users.findByIdAndDelete(id)
        if (result) {
            res.json({
                "status": 200,
                "mess": `Đã xóa người dùng ${id}`,
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Xóa thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete_distributor_id:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await Distributors.findByIdAndDelete(id)
        if (result) {
            res.json({
                "status": 200,
                "mess": `Đã xóa nhà phân phối ${id}`,
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Xóa thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete_fruit_id:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await Fruits.findByIdAndDelete(id)
        if (result) {
            res.json({
                "status": 200,
                "mess": `Đã xóa trái cây ${id}`,
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Xóa thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

router.delete("/delete_car_id:id", async (req, res) => {
    try {
        const { id } = req.params
        const result = await Cars.findByIdAndDelete(id)
        if (result) {
            res.json({
                "status": 200,
                "mess": `Đã xóa xe ${id}`,
                "data": result
            })
        } else {
            res.json({
                "status": 400,
                "mess": "Xóa thất bại",
                "data": []
            })
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;