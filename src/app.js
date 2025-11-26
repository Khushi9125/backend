import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express()
console.log("👉 Starting Express App...");
app.use((req, res, next) => {
    console.log(`➡️ Incoming Request: ${req.method} ${req.url}`);
    next();
});

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))


app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended:true , limit: "16kb"}))
app.use(express.static("public")) //gitkeep jisme asset and wgera store krnge so used static here
app.use(cookieParser())

//routes import
console.log("👉 Importing user router...");
import userRouter from './routes/user.routes.js';
console.log("👉 Loading user router...");
//routes declaration

//when routes and controller on smae place so app.get() use kr rhe but hmne sb separate kr diya hai so we use middleware router ko lane k liye ..so w euse app.use()
app.use("/api/v1/users", userRouter) // jaise hi koi /user likhega ye route kr dega userrouter pr 
// "/users" --- jo hoga wo Prefix hota hai so .. url bnega
// http://localhost:8000/users --- jaise hi /users pr gye to uska control /register pr jyega to ye below url bn jyega
//http://localhost:8000/users/register
//http://localhost:8000/users/login -- for login its a gud practice... 
//http://localhost:8000/api/v2/users/login 
console.log("✅ Router mounted at /api/v1/users");

export { app }