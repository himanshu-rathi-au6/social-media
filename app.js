const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')
const dotenv = require ('dotenv')
const path = require('path')
const colors = require('colors');
const cookie = require('cookie-parser')
const fs = require('fs')
const cors = require("cors")
const expressValidator = require("express-validator")


dotenv.config()
const app  = express()


//
//db
mongoose.connect(process.env.MONGO_URI,{useNewUrlParser:true,
useUnifiedTopology:true})
.then(()=>{
    console.log(colors.bgGreen("DB connected"))
}
)
mongoose.connection.on('error',err =>{
    console.log(colors.red(`Db connection error ${err.message}`))
})







//Routes call
const postRoutes = require('./routes/post.js')
const authRoutes = require('./routes/authRoutes.js');
const userRoutes = require('./routes/usersRoutes.js');
const cookieParser = require('cookie-parser');

//apiDocs
app.get("/",(req,res)=>{
  fs.readFile('data/apiDocs.json',(err,data)=>{
    if(err){
      res.status(400).json({
        error:err
      })
    }
    const docs = JSON.parse(data)
    res.json(docs)
  })

})


//middleware

//body parser
app.use(express.json());
app.use(expressValidator())
app.use(morgan("dev"))
app.use(cookieParser())
app.use(cors())
app.use('/',postRoutes)
app.use('/',authRoutes)
app.use('/',userRoutes)
//unauuth error 
app.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error:"unautherized"});
    }
  });
  if (process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, 'client', 'build')));
    app.get('	',(req,res)=> {
      res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });
  }
const PORT = process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log(colors.bgGreen(`LokVichar is Running on port ${PORT}`))
})