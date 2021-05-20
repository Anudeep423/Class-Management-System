const express = require("express");

const router = express.Router();

const {getUserById,getInstructorById} = require("../controllers/users")

const {checkAccess} = require("../controllers/auth")

const {createSession,getSessionById,updateSessionDetails,getAllSessions,
    deleteSession,getASession,getAllSessionsOfInstructor} = require("../controllers/session")




// middlewares

router.param("instructorId" , getUserById  )

router.param("sessionId" , getSessionById  )



// all session routes 




//protected route to create a session 

router.post("/create/session/:instructorId" , checkAccess ,  createSession );

//protected route to get all details of a session 

router.get("/getasession/:instructorId/:sessionId",checkAccess, getASession);

//protected route to update details of a session 

router.put("/update/session/:instructorId/:sessionId" , checkAccess , updateSessionDetails);

//protected route to get all sessions 

router.get("/getallsessions/:instructorId" ,checkAccess, getAllSessions)

//protected route to delete a session

router.delete("/delete/session/:instructorId/:sessionId",checkAccess,deleteSession)

//protected route to get all sessions of instructor

router.get("/getallsessionsofinstructor/:instructorId", checkAccess ,getAllSessionsOfInstructor   )





//Swagger to create a session





/**
*   @swagger
*    components:
*      schemas:
*        CreateSession:
*          type: object
*          required:
*            - topic
*            - date
*            - startTime
*            - duration  
*          properties:
*            topic:
*              type: string
*              description: Enter topic to be discussed in the session.
*            date:
*              type: string
*              description: Enter date of the session
*            startTime:
*              type: string
*              description: Enter start time of the session.
*            duration:
*              type: string
*              description: Enter time duration of the session
*            studentsAttending:
*              type: array
*              description: Add all the student name to regsiter them for the session.
*          example:

*             topic : maths
*             date  : 14/05/1999
*             startTime : "6:30"
*             studentsAttending : ["Bala,Rakesh"]
*             duration : 1Hr
*               
*/


/**
 * @swagger
 * /api/create/session/{instructorId}:
 *   post:
 *     summary: This is a procted router you can create a session only by passing instructor id , pass student name in studentsAttending array to make them register to the session.
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         description: Enter Instructor ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateSession'
  *     responses:
 *       200:
 *         description: Session created.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       studentsAttending:
 *                         type: array
 *                         example: ["Bala,Rakesh"]
 *                       _id:
 *                         type: string
 *                         example: 60a03d461f431c3ac4e8ad48
 *                       topic:
 *                         type: string
 *                         example: maths
 *                       date:
 *                         type: string
 *                         example: 14/05/1999
 *                       startTime:
 *                         type: string
 *                         example: 6:30
 *                       duration:
 *                         type: string
 *                         example: 1hr
 *                       instructor:
 *                         type: string
 *                         example: Pramod
 *                       __v:
 *                         type: integer
 *                         example: 0
*/    




//  Swagger to get details of a session 






/**
 * @swagger
 * /api/getasession/{instructorId}/{sessionId}:
 *   get:
 *     summary: This is a protected route where you can get details of a session it can only be  accesed by the instructor by providing his Id.
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         description: Numeric instructorId of the user to retrieve.
 *         schema:
 *           type: string
 *       - in: path
 *         name: sessionId
 *         required: true
 *         description: Numeric sessionId .
 *         schema:
 *           type: string
  *     responses:
 *       200:
 *         description: Session Details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       studentsAttending:
 *                         type: array
 *                         example: ["Bala,Rakesh"]
 *                       _id:
 *                         type: string
 *                         example: 60a03eb30c4e011510174d9d
 *                       topic:
 *                         type: string
 *                         example: maths
 *                       date:
 *                         type: string
 *                         example: 14/05/1999
 *                       startTime:
 *                         type: string
 *                         example: 6:30
 *                       duration:
 *                         type: string
 *                         example: 1hr
 *                       instructor:
 *                         type: string
 *                         example: Pramod
 *                       __v:
 *                         type: integer
 *                         example: 0
 */








// Swagger to update a session




/**
*   @swagger
*    components:
*      schemas:
*        UpdateSession:
*          type: object
*          required:
*            - instructor
*            - topic
*            - date
*            - startTime
*            - duration  
*          properties:
*            instructor:
*              type: string
*              description: Enter instructor name
*            topic:
*              type: string
*              description: Enter topic to be discussed in the session.
*            date:
*              type: string
*              description: Enter date of the session
*            startTime:
*              type: string
*              description: Enter start time of the session.
*            duration:
*              type: string
*              description: Enter time duration of the session
*            studentsAttending:
*              type: array
*              description: Add all the student name to regsiter them for the session.
*          example:
*               
*/


/**
 * @swagger
 * /api/update/session/{instructorId}/{sessionId}:
 *   put:
 *     summary: This is a procted router you can update a session only by passing instructor id.
 *     parameters:
 *       - in: path
 *         name: instructorId 
 *         required: true
 *         description: Enter Instructor ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: sessionId 
 *         required: true
 *         description: Enter Session ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content: 
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateSession'
  *     responses:
 *       200:
 *         description: Session updated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       studentsAttending:
 *                         type: array
 *                         example: ["Bala,Rakesh"]
 *                       _id:
 *                         type: string
 *                         example: 60a03eb30c4e011510174d9d
 *                       topic:
 *                         type: string
 *                         example: maths
 *                       date:
 *                         type: string
 *                         example: 14/05/1999
 *                       startTime:
 *                         type: string
 *                         example: 6:30
 *                       duration:
 *                         type: string
 *                         example: 1hr
 *                       instructor:
 *                         type: string
 *                         example: Pramod
 *                       __v:
 *                         type: integer
 *                         example: 0
*/    








//  Swagger to get all sessions





/**
 * @swagger
 * /api/getallsessions/{instructorId}:
 *   get:
 *     summary: This is a protected route where you get details of all the sessions
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         description: Enter InstructorID
 *         schema:
 *           type: string
  *     responses:
 *       200:
 *         description: A list of sessions of an instructor.
 *         content:
 *           application/json:
  *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       studentsAttending:
 *                         type: array
 *                         example: ["Bala,Rakesh"]
 *                       _id:
 *                         type: string
 *                         example: 60a03eb30c4e011510174d9d
 *                       topic:
 *                         type: string
 *                         example: maths
 *                       date:
 *                         type: string
 *                         example: 14/05/1999
 *                       startTime:
 *                         type: string
 *                         example: 6:30
 *                       duration:
 *                         type: string
 *                         example: 1hr
 *                       instructor:
 *                         type: string
 *                         example: Pramod
 *                       __v:
 *                         type: integer
 *                         example: 0
 */








//  Swagger to delete a session 





/**
 * @swagger
 * /api/delete/session/{instructorId}/{sessionId}:
 *   delete:
 *     summary: This is a protected route where you can delete a session .
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         description: Enter Instructor ID .
 *         schema:
 *           type: string
 *       - in: path
 *         name: sessionId 
 *         required: true
 *         description: Enter Session ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Deletion Successfull.
  *         content:
 *           application/json:
  *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       message:
 *                         type: string
 *                         example: Successfully deleted

 */





// Swagger to get all sessions of an instructor by passing his id and name


/**
 * @swagger
 * /api/getallsessionsofinstructor/{instructorId}:
 *   get:
 *     summary: This is a protected route where you can all the sessions of an instructor .
 *     description: Retrieve a single JSONPlaceholder user. Can be used to populate a user profile when prototyping or testing an API.
 *     parameters:
 *       - in: path
 *         name: instructorId
 *         required: true
 *         description: Numeric instructorId of the user to retrieve.
 *         schema:
 *           type: string
  *     responses:
 *       200:
 *         description: A list of sessions of an instructor.
 *         content:
 *           application/json:
  *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                     type: object
 *                     properties:
 *                       studentsAttending:
 *                         type: array
 *                         example: ["Bala,Rakesh"]
 *                       _id:
 *                         type: string
 *                         example: 60a03eb30c4e011510174d9d
 *                       topic:
 *                         type: string
 *                         example: maths
 *                       date:
 *                         type: string
 *                         example: 14/05/1999
 *                       startTime:
 *                         type: string
 *                         example: 6:30
 *                       duration:
 *                         type: string
 *                         example: 1hr
 *                       instructor:
 *                         type: string
 *                         example: Pramod
 *                       __v:
 *                         type: integer
 *                         example: 0
 */





module.exports = router;