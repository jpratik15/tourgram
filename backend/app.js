const express = require('express');
const bodyParser  = require('body-parser');
const moongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const HttpError = require("./models/http-error")
const placesRoutes = require("./routes/places-routes")
const usersRoutes = require("./routes/users-routes")

const app = express();

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.setHeader("Access-Control-Allow-Methods",'GET, POST, PATCH, DELETE');
    next();
});
app.use("/uploads/images",express.static(path.join('uploads', 'images')));
app.use("/api/places",placesRoutes);
app.use("/api/users",usersRoutes);

app.use((req,res,next)=>{
    const error = new HttpError("Route Not Found",404);
    return next(error);
})

app.use((error,req,res,next)=>{
    if(req.file){
        fs.unlink(req.file.path, (err)=> {
            console.log(err);
        })
    }
    if(res.headerSent){
        return next(error);
    }
    
    res.status(error.code || 500);
    res.json({message : error.message || "An unknown error occured"});
    
})


moongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.jxngd.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`).then(()=>{
    app.listen(process.env.PORT || 5000);
    console.log("Server Up");
}).catch(err =>{
    console.log(err);
})
