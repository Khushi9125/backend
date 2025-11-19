import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

// db is in another contintent so we need use fucntion in aysnch
const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) //mongose giving us return object usko kcbh bhi name de skte hai so here we are holding in connectionIInstance and logging below
        console.log(`\nMongoDB connected!! DB Host: ${connectionInstance.connection.host}`);  //connectionInstance k andr bhut sare object milte hai so jahan pr connection ho rha hai wo mil jye...bcz agr khin glti s kisi or host m connect ho jye like prod , devlopmnt to mujhe pta chl jye
    }catch (error){
        console.log("MONGO DB CONNECTION FAILED ERROR ",error);
        process.exit(1) // error handling- we can do throw error also to exit ho jyega but nodejs giving us process.exit(1)...wid differnt numbers alg alg pprocess k alg alg number codes hote hai
    }
}

export default connectDB