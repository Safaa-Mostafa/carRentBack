const mongoose = require('mongoose')
const bcrypt = require("bcryptjs");
var jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  orders:[
    {
      carId:{ type: mongoose.Schema.Types.ObjectId,
       ref:"car",
      },
      image:{type:String},
      name:{type:String}, 
      dailyRentalRate:{type:Number}        
    }
  ],
    password: {
      type: String,
      required: true,
      trim: true   
    },
    ConfirmPassword:{
      type: String,
      required: true,
      trim: true 
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
     tokens:[
      {
          token: {type:String, required:true}
      }
  ],
  image:{
    type:String,
    default:'images/img-1664469043687.jpg'
  }

}
);

userSchema.methods.toJSON = function () {
  const userData = this.toObject();
  delete userData.__v;
  delete userData.password
  delete userData.ConfirmPassword
  return userData;
};
userSchema.pre("save", async function () {
  const data = this;
  if (data.isModified("password","ConfirmPassword")) {
    data.password = await bcrypt.hash(data.password, 12);
    data.ConfirmPassword =await bcrypt.hash(data.ConfirmPassword,12)
  }

});
userSchema.statics.checkPass = async (email, oldPass) => {
  const userData = await user.findOne({ email });
  if (!userData) throw new Error("invalid email");
  const checkPass = await bcrypt.compare( oldPass,userData.password);
  if (!checkPass) throw new Error("invalid Password");
  return userData;
};
userSchema.statics.login = async (email, pass) => {
  const userData = await user.findOne({ email });
  if (!userData) throw new Error("invalid email");
  const checkPass = await bcrypt.compare(pass, userData.password);
  if (!checkPass) throw new Error("invalid Password");
  return userData;
};
userSchema.methods.generateToken = async function () {
  const user = this;
  if (user.tokens.length == 15) throw new Error("token exded");
  const token = jwt.sign({ _id: user._id }, "privateKey");
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return token;
};

userSchema.virtual("car",{
  ref:"car",
  localField:"_id",
  foreignField:"BrandId"
})
userSchema.virtual("myBrand", {
  ref: "Brand",
  localField: "_id",
  foreignField: "userId",
});


const user = mongoose.model("user", userSchema);
module.exports = user;
