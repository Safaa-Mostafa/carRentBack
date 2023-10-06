const carModel = require("../database/Models/car.model")
const upload1=require("../../middleware/fileUpload")
class car{
static addcar = async(req,res)=>{
    try{
    const car=  await new carModel(req.body)
    await car.save()
    res.status(200).send({
       apiStatus:true,
       data:car,
       message:"car added successfully"

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
      const Brand = await carModel.findById(req.params.id)
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

static allcar=async(req,res)=>{
 try{
   const cars = await carModel.find()  

   res.status(200).send({
        apiStatus:true,
        data:cars,
        message:"all car of user"
     })
 } catch(e){
    res.status(500).send({
        apiStatus:false,
        data:e,
        message:e.message
 })
}
}
static showcar = async(req,res)=>{
    try{
       const car =await carModel.findOne({_id:req.params.id})         
       res.status(200).send({
        apiStatus:true,
        data:car,
        message:"data"
        })
            }catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:e.message
        })
            }
}
static deletecar =async(req,res)=>{
    try{
        const car =await carModel.deleteOne({_id:req.params.id})         
        res.status(200).send({
         apiStatus:true,
         data:car,
         message:"data"
         })
             }catch(e){
         res.status(500).send({
             apiStatus:false,
             data:e,
             message:e.message
         })
             }  
}
static delAll=async(req,res)=>{
    try{
await req.user.remove()
res.send('done')
    }catch(e){
res.status(500).send({
    apiStatus:false,
    data:e,
    message:e.message
})
    }
}
static singlecar =async (req,res)=>{
    try{
let data = await carModel.findById(req.params.id)
res.status(200).send({
    apiStatus:true,
    data:data,
    message:"singlecar"
})
    }catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:e.message
        })  
    }
}
static usercars = async(req,res)=>{
    try{
    await req.user.populate("mycar")
res.status(200).send({
data:req.user.mycar,
message:"data fetched",
apiStatus:true
})    
}catch(e){
    res.status(500).send({
        data:e,
        message:e.message,
        apiStatus:false
    })
}
}
static userCategory = async(req,res)=>{
    try{
    await req.user.populate("mycar")
res.status(200).send({
data:req.user.myCategory,
message:"data fetched",
apiStatus:true
})    
}catch(e){
    res.status(500).send({
        data:e,
        message:e.message,
        apiStatus:false
    })
}
}
static Editcar = async(req,res)=>{
    try{
        const myUpdates = Object.keys(req.body)
        const allowedEdits = ["title","description"]
        const validEdits = myUpdates.every(
            (update) => allowedEdits.includes(update)
            )
        if(!validEdits) throw new Error ("invalid edits")

        const car = await carModel.findById(req.params.id)
        if(!car) throw new Error("invalid id")
        
        myUpdates.forEach(update => car[update]= req.body[update])
        
        await car.save()
        
        res.status(200).send({
            apiStatus: true,
            date: car,
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
static searchCar =async(req,res)=>{
    try{
        let dataSearch=[]
        if(req.body.brand == '' || req.body.city == ''){
           dataSearch=await carModel.find({})

        }else{
            dataSearch=await carModel.find({brand:req.body.brandId,city:req.body.city})
        }
        res.status(200).send({
        apiStatus:true,
        data:dataSearch,
        message:"filtered"
    })


}catch(e){
     
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:e.message
        })
    }
}

static search =async(req,res)=>{
    try{



const dateend = new Date(req.body.endDate + 'T21:00:00.000Z');
const isoStringend = dateend.toISOString();
const datestart = new Date(req.body.startDate + 'T21:00:00.000Z');
const isoStringstart = datestart.toISOString();


    const dataSearch=await carModel.find({rentalendDate:isoStringend,rentalstartDate:isoStringstart,country:req.body.country,city:req.body.city})
        res.status(200).send({
        apiStatus:true,
        data:dataSearch,
        message:"filtered"
    })


}catch(e){
     
        res.status(500).send({
            apiStatus:false,
            data:e,
            message:e.message
        })
    }
}
static sort = async(req,res)=>{
    try {
        if (req.query.SortByValue == 1) {
          var dh = { dailyRentalRate: 1 };
        } else if (req.query.SortByValue == 2) {
          var dh = { dailyRentalRate: -1 };
        } else {
          console.log("not found");
        }
        const cars = await carModel.find({}).sort(dh);
  
        if (cars.length === "") {
          res.status(201).send({
            apiStatus: true,
            message: " not found doctor to show",
          });
        }
        res.status(200).send({
          apiStatus: true,
          data: cars,
          message: "doctors fetched success",
        });
      } catch (e) {
        res.status(500).send({
          apiStatus: true,
          data: e,
          message: e.message,
        });
      }
}
}
module.exports =car