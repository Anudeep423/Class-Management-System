const sessionSchema = require("../models/session")


//Middleware to get session details by passing session id so that lined up middleware can get it by req.session

exports.getSessionById = (req, res, next, id) => {
  console.log('Called', id)
  sessionSchema.findOne({ _id: id })
    .exec((err, session) => {
      if (err || !session) {
        return res.json(err)
      }
      req.session = session
      next();
    })
}

//Controller to display ression details passed by getSessionById middleware

exports.getASession = (req, res) => {

  return res.json(req.session);

}


//Controller to create a session 


exports.createSession = (req, res) => {

  const session = new sessionSchema(req.body)
    console.log("calleddd",req.body)
  session.instructor = req.user.name;

  session.save((err, session) => {
    if (err) {
      return res.json({
        error: err
      })
    }
    return res.json(session);
  })
}


// Controller to get all the sessions created

exports.getAllSessions = (req, res) => {
  sessionSchema.find()
    .exec((err, sessions) => {
      if (err || !sessions) {
        return res.json(err)
      }
      return res.json(sessions)
    })
}


//Controller for  updating session details 



exports.updateSessionDetails = (req, res) => {
  console.log("updateSessionDetails", req.session)
  sessionSchema.findByIdAndUpdate(
    { _id: req.session._id },
    { $set: req.body },
    { new: true, useFindAndModify: false },
    (err, session) => {
      if (err) {
        return res.status(400).json({
          error: err
        });
      }
      res.json(session);
    }
  );
};


//Controller for deleting a session 

exports.deleteSession = (req, res) => {
  const session = req.session;
  session.remove((err, session) => {
    if (err) {
      return res.status(400).json({
        error: "Failed to delete this session"
      });
    }
    res.json({
      message: "Successfully deleted"
    });
  });
}

//Controller to get all the Student sessions in which he is registered in 


exports.checkStudentSessions = (req, res) => {

  sessionSchema.aggregate([
    { $match: { "studentsAttending": req.user.name } }
  ]).exec((err, sessions) => {
    if (err || !sessions) {
      return res.json(err)
    }
    return res.json(sessions)
  })


}


//Controller to get all the sessions of a particular instructor *

exports.getAllSessionsOfInstructor = async (req, res) => {
  await sessionSchema.aggregate([
    { $match: { "instructor": req.user.name } }
  ]).exec((err, sessions) => {
    if (err) {
      return res.json(err)
    }
    return res.json(sessions)
  })


}
