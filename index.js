const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("dotenv").config();
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser");
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Importing routes

const userRoutes = require("./views/users")
const sessionRoutes = require("./views/session")


// Swagger definition

const swaggerDefinition = {
    openapi: '3.0.0',

    servers: [
      {
        url: 'http://localhost:8080',
        description: 'Development server',
      },
    ],
  };
  
  const options = {
    swaggerDefinition,
    // Paths to files containing OpenAPI definitions
    apis: ['./views/*.js'],
  };
  
  const swaggerSpec = swaggerJSDoc(options);


// route to access Swagger 

app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Creating a Port Number

const port = 8080;

// Middlewares

app.use(bodyParser.json())
app.use(cookieParser()) 

app.get("/", (req,res) => {
return res.send("app working")
}  )

// Connecting to mongoDB

mongoose
  .connect( process.env.DATABASE  , {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED");
  }).catch(err => {console.log(err)} )

// all routes  

app.use("/api",userRoutes);
app.use("/api",sessionRoutes)





// Starting server

app.listen(port  , console.log(`port started running on ${port}`))