const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');
const User = require('./model/user');

const initializePassport = (passport) => {
  const authenticationUser = async (email, password, done) => {
    const user = await User.find({email: email});
    console.log(user);
    
    if(user[0] == null){
      console.log('user not found');
      return done(null, false, {err: "Not found user"})
    }
    try{
      if(await bcrypt.compare(password, user[0].password)){
        return done(null, user[0]);
      }else{
        console.log(false);
        return done(null, false, { message: 'Password incorrect' })
      }
    }catch(err){
      done(err);
    }
  }
  passport.use(new LocalStrategy({usernameField: 'email'}, authenticationUser));

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });
}

module.exports = initializePassport;