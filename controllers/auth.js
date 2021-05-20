const userSchema = require("../models/users");
var jwt = require("jsonwebtoken");

//Signup controller 



exports.signup = (req, res) => {
    const user = new userSchema(req.body);
    user.save((err, user) => {
      if (err) {
        return res.status(400).json({
          error : err
        });
      }
      res.status(200).json({
       user
      });
    });
  };






//Signin controller 



  exports.signin = (req, res) => {

    const {email,password} = req.body

    userSchema.findOne({ email }, (err, user) => {
      if (err || !user) {
        return res.status(400).json({
          error: "USER email does not exists"
        });
      }
  
      if (!user.autheticate(password)) {
        return res.status(401).json({
          error: "Email and password do not match"
        });
      }
  
      //create token
      const token = jwt.sign({ _id: user._id }, process.env.SECRET  );
      //put token in cookie
      res.cookie("token", token, { expire: new Date() + 9999 });
  
      //send response to front end
      const { _id, name, email, role , encry_password  } = user;
      return res.json({ token, user: { _id, name, email, role , encry_password  } });
    });
  };





 //Checking wheather the user is intructor or not *
 
 

exports.checkAccess = (req,res,next) => {
      console.log("Called")
    if(req.user.role === 1 ){
        next();
    }else{
        return res.json("You dont have permission to perform this operation")
    }
}