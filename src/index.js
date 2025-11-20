//require('dotenv').config({path: './env'})
// import mongoose from "mongoose";
// import { DB_NAME } from "./constants";
//import connectDB from "./db";  this will give error ye iport ni krta directly so add /index.js like below  error will change db load hua but constant file load ni hua  jo we need to add constants.js there

import dotenv from "dotenv"
import connectDB from "./db/index.js";  



dotenv.config({ //above format makeing difficult for code consistency so we can use like this so

    path: './env'
})


connectDB()
.then(() => {
    app.on("error", (error) => { //added a callback here
        console.log("ERR:" , error); 
        throw error
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at Port: ${process.env.PORT}`)
    })
})
.catch((err) =>{
    console.log("MONGO DB connection failed..... ",err);
})
/* 2nd approach is professional approach , we take separate file for connection do connection there under any folder like db and import here which is good practice.
*/















/*

// function connectDB(){}
// connectDB()
//this is also but we can make it professional so we use efi concept in js , function hai use immediate execute krdo , arrow function ,which execute immediately add async...sometime coders add ; semicoplpn in starting when efe's starting just bcz editor forget to add semicolon in last colon , so basicaaly professional do good pratices and add like this: ;( async () => {})()...here we r not using bcz we dont have any code before
//we can create efe and database me asych await and try ctach used here error bhi handle kiya hai
---- Below code is first approach but we commented bcz index.js file me hi sara code hai

import express from "express";
const app = express()
( async () => {
    try{
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        app.on("error", (error) => { //added a callback here
            console.log("ERR:" , error); 
            throw error
        })
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })
    }
    catch(error){
        console.log("Error:", error)
        throw err
    }
})()

*/