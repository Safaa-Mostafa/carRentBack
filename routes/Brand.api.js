const router = require("express").Router()
const Admin =require("../middleware/admin")
const BrandController=require("../app/controller/Brand.controller")
const upload1 = require("../middleware/fileUpload")
router.post("/uploadImage/:id",upload1.single('img'),BrandController.addImage)

router.post("/addBrand",BrandController.addBrand)
router.get('/show',BrandController.show)
router.patch('/edit/:id',Admin,BrandController.editUser)
router.delete('/delete/:id',Admin,BrandController.delete)
router.get('/show/:id',BrandController.single)

module.exports= router


