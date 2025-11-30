import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username : {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true,
        },
        avatar: {
            type: String, //cloudinary m upload krke ka url use krenge
            required: true,
        },
        coverImage: {
            type: String, //cloudinary ka url use krenge
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video" //refernce or ref is same
            }
        ],
        password: {
            type: String,
            required: [true ,'Password is required'],
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true //it will give created at ,updated at
    }
)

userSchema.pre("save" , async function (next) { //save event,
    console.log("👉 Before hashing password:", this.password); // DEBUG
    if(!this.isModified("password")) return next(); //we are checking here in save event jb sva ebutton click hogi bcz jb koi password m aaye tbgi bcrypt ho othjerwise return ho jye ..without to jb koi save evnt hit hoga hr bar password bcrypt ho jyeg that problem so added if conditon ...checking negative
    
    this.password = await bcrypt.hash(this.password, 10); //kitne hash rounds lgaye like 8,10
    console.log("👉 After hashing password:", this.password); // DEBUG
    next(); //
}) 

userSchema.methods.isPasswordCorrect = async function (password) { //custom method in mongoose
    return await bcrypt.compare(password, this.password); //bcrytpt will check here paswword using compare method in bcrypt library ...compare bolta hai ek password string m dosra encypt m dono ko comprae krega time lgta hai cryptography hai so await legga return krdo ...comprae true or false deta hai
}

//encryption below for generating access token
userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            username: this.username,
            fullName: this.fullName
        },
        process.env.ACCESS_TOKEN_SECRET, 
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    );
}
//encryption below for generating refersh token, isme info k hoti bcz ye refersh hota rhta hai 

userSchema.methods.generateRefreshToken = function(){ 
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET, 
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    );
}

export const User = mongoose.model("User", userSchema)