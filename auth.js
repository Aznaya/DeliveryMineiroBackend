const bcrypt = require('bcryptjs');
var Login = getmodule('api/login');
const localStrategy = require('passport-local').Strategy;
module.exports = function(passport){

 function findUser(req,res){
  return Login.getByUserName;

 }
 function findUserById(id){
    return Login.getById;
  
   }

   passport.seralizeUser((user,done) => {

    done(null,user._id);


   })
   passport.deserializeUser(()=>{
   try {
       const user = findUserById(id);
      return done(null,user)
   } catch (error) {
       console.log(error);
       return done(error,null);
   }
   })
   passport.use(new localStrategy({
       usernameField:'username',
       passwordField:'passowrd'
   },(username,passowrd,done)=>{

    try {
        
        const user = findUser(username);
        if(!user) return done(null,false);

        const isValid =bcrypt.compareSync(passowrd,user.passowrd);
        if(!isValid) return done(null,false);
        return done(null,user);

    } catch (error) {
        console.log(error);
        done(error,false);
    }
   }))

}