import { asyncHandler } from  "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js"


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

export {
    registerUser,
}



//Extra learning

//below is easy code like multile if's above use function like a advanced code
// if(fullName == ""){
//     throw new ApiError(400, "Fullname is Required")
// }