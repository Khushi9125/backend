import { asyncHandler } from  "../utils/asyncHandler.js";
console.log("👉 registerUser controller called");

const registerUser = asyncHandler(async (req, res) => { //higher order fucntion
    console.log("👉 registerUser controller called 2");
    console.log("📦 Request Body:", req.body);
    res.status(200).json({
        message: "ok code run here"
    })
})

export {
    registerUser,
}