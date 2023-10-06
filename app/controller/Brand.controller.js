const BrandModel = require("../database/Models/Brand.model")

class Brand{

static addBrand = async(req,res)=>{
    try{
    const addBrand=  new BrandModel(req.body)

    await addBrand.save()
    res.status(200).send({
       apiStatus:true,
       data:addBrand,
       message:"Brand added successfully"

    })
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static addImage = async(req,res)=>{
    try{
      const Brand = await BrandModel.findById(req.params.id)
      Brand.image = req.file.path.replace("public\\","") || ""
    Brand.save()
      res.status(200).send({
          apiStatus:true,
          data:Brand,
          message:"added"
      })}catch(e){
       
          res.status(500).send({
              apiStatus:false,
              data:e,
              message:e.message
          })
      }
  }
static show = async(req,res)=>{
    try{
const allBrand = await  BrandModel.find()

res.status(200).send({
    apiStatus:true,
    data:allBrand,
    message:"all categories"
})
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static editUser = async(req,res) =>{
    try{
        const myUpdates = Object.keys(req.body)
        const allowedEdits = ["name"]
        const validEdits = myUpdates.every(
            (update) => allowedEdits.includes(update)
            )
        if(!validEdits) throw new Error ("invalid edits")

        const user = await BrandModel.findById(req.params.id)
        if(!user) throw new Error("invalid id")
        
        myUpdates.forEach(update => user[update]= req.body[update])
        
        await user.save()
        
        res.status(200).send({
            apiStatus: true,
            date: user,
            message: "user data fetched"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus: false,
            date: e,
            message: e.message
        })
    }
}
static delete =async (req,res)=>{
    try{
const data = await BrandModel.findByIdAndDelete(req.params.id)
res.status(200).send({
    apiStatus:true,
    data:data,
    message:"Brand is deleted"
})
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static single=async(req,res)=>{
    try{
    const Brand =await BrandModel.findById(req.params.id)
res.status(200).send({
    apiStatus:true,
    data:Brand,
    message:"all data fetched"
})    
}catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}

}
module.exports =Brand