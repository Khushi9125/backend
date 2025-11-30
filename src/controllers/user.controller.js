import { asyncHandler } from  "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";


//if password exists- access and refresh token generate
const generateAccessAndRefreshTokens = async (userId) => {
    try{
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken(); //generating here
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken
        await user.save({ validateBeforeSave: false})

        return {accessToken, refreshToken}

    } catch(error){
        throw new ApiError(500, "Something went wrong while generating refresh and acess token")
    }
}

const registerUser = asyncHandler(async (req, res) => { //higher order fucntion
    console.log("RegisterUser route Started here:");
    //get user details from frontend -- here we take from postman --we see what model we create for user what details required
    //validation - not empty --- email empty to nhi hai , format , name and all sb check krnge 
    //check if user already exists: through username and email
    //check for images , check for avatar
    //upload them to cloudinary,image and avaatar
    //create user object : create entry in db  ---we are sending data to mongodb which is a nosql databases , isme objects hi bnaye jate hai jydatar or upload kiye jate so after object creating krnege entry call.
    //remove password and refresh token field from response
    //check for user creation
    //return response if successful else send eror.


    //if data come from form or json we can use req.body
    const {fullName, email, username, password } = req.body;
    //console.log("Email: ",email);

    //1. Validation check
    if(
        [fullName, email, username, password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required.") //taking from error file
    }

    //2. User exists or not already thorugh db we check username or email if anythong is already exists it return true.
    const existedUser = await User.findOne({
        $or: [{ username },{ email }] //$ or operator used here jitni values check krni hai utni object k andr chk kr skte h
    })
    if(existedUser){
        throw new ApiError(409, "User with email or username already exist.")
    }
    console.log(req.files);

    //3.Check for images and coverimage
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path; 

    // console.log("Avatar image local path: " , avatarLocalPath);
    // console.log("Cover image local path: " , coverImageLocalPath);

    //handling error of above code req.files?.coverImage[0]?.path ...means its mandatory so we handle through checking 
    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0]?.path;
    }
    if(!avatarLocalPath){
        throw new ApiError(400, "Avatar file is required.")
    }

    //4.Upload in cloudinary
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);
    
    
    if(!avatar){
        throw new ApiError(400, "Avatar file is required.")
    }

    //5. Create object and make entry in database
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        password,
        username: username.toLowerCase()
    })

    //6.Remove password and refresh token field from response
    // mongodb ek _id create krta hai hr user ki us id s chek krnge user create hua h ki nhi then select fucntion k through select m likhte hai kya kya nhi chahiye bcz bydefault all selected hota hai strin me - m likhte hai like below
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //7. Check for user creation
    //these above 2 fields select hokr nhi ayegi created user m 
    if(!createdUser){
        throw new ApiError(500, "Something went wrong while registering a user.")
    }
   
    //8. Return response
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully") // (200, createdUser, "User Registered Successfully") -- response , data , msg
    )
})


//Login user ---

const loginUser = asyncHandler(async (req, res) => {
    //1. req body -> data le aao
    //2. username or email to login
    //3. find the user
    //4. password check - if false throw wrong erroe
    //5. if password exists- access and refresh token generate
    //6. send in cookies
    //7. response send successfully login

    const {email, username, password} = req.body;
    console.log(email);
    console.log("Password received:", password);

    
    //email or username present or not
    if(!username && !email){
        throw new ApiError(400, "Username or password is required")
    }
    const user = await User.findOne({
         $or: [{ username },{ email }] //ya to email mil jye ya username-query
    })

    console.log("👉 User found:", user);
    console.log("👉 Password received in login:", password);
    console.log("👉 Encrypted password in DB:", user.password);
    //User not extsts throw error
    if(!user){
        throw new ApiError(404, "User does not exist")
    }
    //Password check
    const isPasswordValid  = await user.isPasswordCorrect(password);

    //4. password check - if false throw wrong erroe
    if(!isPasswordValid){
        throw new ApiError(401, "Invalid User Credentials")
    }

    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(user._id);
    console.log(accessToken,refreshToken);

    //Here we need to update object or do one query do at your conveince bcz above user object has empty refresh token
    //so we created another object with all filed 
    const loggedInUser = await User.findById(user._id).select("-password -refreshToken");

    //6. send in cookies---cookies can be meodify through frontened so here we add some security ...so this can update through server only
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("accessToken", accessToken, options) //key, value , pair
    .cookie("refreshToken", refreshToken, options)
    .json(
        new ApiResponse(
            200, 
            {
                user: loggedInUser, accessToken, refreshToken //here we sending user object with these 3
            },
            "User logged In Successfully."
        )
    )

})

//Log out user 
//1. Remove cookies bcz ye server s hi hategi
//2. refrestoken present in model usko bhi reset krna hoga
//Here we using middleware since anybody can logout through any mail so we add a check here ..
//We are creating authentication middle so creating file auth.middleware.js
const logoutUser = asyncHandler(async(req,res) => {
    User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: undefined
            }
        },
        {
            new: true //new value return m response hoga usko store krre
        }
    )

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200,{} ,"User logged out successfully."))
})

//Refresh access token end point
const refreshAccessToken = asyncHandler(async(req,res) => {
    const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken;
    
    if(incomingRefreshToken){
        throw new ApiError(401, "Unauthorized request");
    }
    //verify krwaynge thorugh jwt 
    //decoded token milega
    try {
        const decodedToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )
    
        //take infromating through query in db of user
        const user = await User.findById(decodedToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid refresh Token");
        }
    
        //user or icomingrefresh token k refresh token match krwynge
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "Refresh token is expired or used.")
        }
    
        const options = {
            httpOnly: true,
            secure: true
        }
    
        const {accessToken, newRefreshToken} = await generateAccessAndRefreshTokens(user._id);
    
        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {accessToken, refreshToken: newRefreshToken},
                "Access Token refreshed",
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid refresh token") 
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}



//Extra learning

//below is easy code like multile if's above use function like a advanced code
// if(fullName == ""){
//     throw new ApiError(400, "Fullname is Required")
// }