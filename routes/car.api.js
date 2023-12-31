const router = require("express").Router()
const Admin = require("../middleware/admin")
const Auth = require('../middleware/auth')
const carController=require("../app/controller/car.controller")
router.get("/all",carController.allcar)
router.get("/showcar/:id",carController.showcar)
router.delete("/all/:id",carController.deletecar)
router.delete("/delAll",carController.delAll)
router.get("/singlecar/:id",carController.singlecar)
router.patch("/Editcar/:id",carController.Editcar)
router.get("/usercars",carController.usercars)
router.get("/userCategory",carController.userCategory)
const upload1=require("../middleware/fileUpload")
router.post("/addcar",upload1.single('img'),carController.addcar)
router.post("/upload/:id",upload1.single('img'),carController.addImage)
router.post('/search',carController.search)
router.get('/sort',carController.sort)
router.post('/searchCar',carController.searchCar)
module.exports= router

