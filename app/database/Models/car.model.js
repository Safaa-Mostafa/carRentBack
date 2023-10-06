const mongoose = require("mongoose");

const carSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  },
  brand: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Brand",
  },
  numberOfDoors: {
    type: Number,
    min: 1,
    max: 255,
    default: 4,
  },
  transmission: {
    type: String,
    enum: ["Manual", "Automatic"],
    default: "Manual",
  },
  airConditioner: {
    type: Boolean,
    default: false,
  },
   dailyRentalRate: {
    type: Number,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "user",
    required: true,
  },

country:{
  type:String
},

image:{
  type:String,
  default:'images\\img-1671957978439.png'
},
rentalstartDate:{
  type: Date, required: true 
},
rentalendDate:{
   type: Date, required: true 

},
city:{
  type:String
}
});
carSchema.pre(/^find/,function(next){
  this.populate({path:"brand",select:'name'});
  next();
  })
const Car =mongoose.model("car",carSchema)
module.exports = Car
