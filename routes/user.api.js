const router = require("express").Router()
const GoogleStrategy = require('passport-google-oauth20').Strategy

const googleAuth = require("../app/controller/googleAuth")
const auth = require("../middleware/auth")
const Admin=require("../middleware/admin")
const userController=require("../app/controller/user.controller")
router.get('/all',userController.all)
router.get("/all/:id",auth, userController.single)
router.delete("/all",auth, userController.delete)
router.patch("/all/:id",auth,userController.editUser)
router.patch("/editPass/", userController.editPass)
router.get("/profile",auth,userController.profile)
router.post("/login",userController.login)
router.get("/logout",auth,userController.logout)
const upload1 = require("../middleware/fileUpload")
router.post('/register',userController.register)
router.post('/upload/:id',upload1.single('img'),userController.uploadImage)
router.post('/order/:id',auth,userController.order)
router.post('/delOrder/:id',userController.Delorder)
router.get('/countries',userController.allCountry)
router.get('/allCities',userController.allCities)

// router.get('/google',passport.authenticate('google',{scope:['profile','email',]}));
// router.get('/googleCallback',passport.authenticate('google'),(req,res)=>{
    
// });

module.exports = router