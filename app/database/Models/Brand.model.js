const mongoose =require('mongoose')

const BrandSchema = mongoose.Schema({

name:{
type:String,
trim:true,
maxLength:255,
unique: true 
},    
userId:{
  type:mongoose.Schema.Types.ObjectId,
  required:true,
  ref:"user",
},
image:{
  type:String
}
})
BrandSchema.virtual("car",{
  ref:"car",
  localField:"_id",
  foreignField:"BrandId"
})
const Brand =mongoose.model("Brand",BrandSchema)

module.exports = Brand