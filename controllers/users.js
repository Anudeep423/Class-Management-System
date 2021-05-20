const userSchema = require("../models/users");

// Controller to get all the users


  exports.getAllUsers = (req,res) => {
    userSchema.find()
    .select("-salt -encry_password -updatedAt -createdAt -__v ")
    .exec( (err , users) => {
        if(err || !users){
            return res.json(err)
        }  
         return res.json(users)   
    } )
  }

//Middleware to get all the user details by passing user id so that all the lined up controllers can access it by req.user

  exports.getUserById = (req,res,next,id) => {
    userSchema.findOne({_id : id  })
    .exec( (err,user) => {
        if(err || !user){
            return res.json(err)
        }
        req.user = user
        next();
    }   )
}

//Controller to get all the instructor details by passing instructor id *

exports.getInstructorById = (req,res,next,id) => {

    userSchema.findOne({_id : id  })
    .exec( (err,user) => {
        if(err || !user){
            return res.json(err)
        }
        req.user = user
        next();
    }   )
}


//Controller to get all the students


exports.getAllStudents = (req,res) => {
    userSchema.aggregate([
        { $match: { role : 0   } },
        { $project : { role : 0 , salt : 0 , encry_password : 0 , createdAt : 0 ,updatedAt : 0 , __v : 0   }  }
    ]).
        exec((err, students) => {
            res.json(students   )
        })
}

//Controller to display student details passed by getUserById Middleware



exports.getAUser = (req,res) => {
return   res.json(req.user)
}

//Controller to display instructor details passed by getInstructorById Middleware *

// exports.getInstructorById = (req,res) => {
//     return   res.json(req.user)
//     }





  
  
  
