const GoogleStrategy = require('passport-google-oauth20').Strategy
const user = require("../database/Models/user.model");
const clientId =require("./googleData").clientId
const clientSecret =require("./googleData").clientSecret

module.exports = function(passport){
    passport.use(new GoogleStrategy({
clientID:clientId,
clientSecret:clientSecret,
callbackURL:"http://localhost:3000/google/callback"
    },(accessToken,refreshToken,profile,done)=>{
console.log(profile.emails[0].value);
//find if a user exist with email or not 
user.findOne({email:profile.emails[0].value}).then((data)=>{
    if(data){
        return done(null,data)
    }else{

    user({
        username:profile.displayName,
        emails:profile.emails[0].value,
        googleId:profile.id,
        password:null,
        provider:"google",
        isVerified:true,

    }).save(function(err,data){
return done(null,data)
    })
}
});
    }
    
    ))
    passport.serializeUser((user, done) => {
        done(null, user.id);
      });

      passport.serializeUser((id, done) => {
       user.findById(id,function(err,user){
        done(err, user);

       })
      });
    
    
    }
