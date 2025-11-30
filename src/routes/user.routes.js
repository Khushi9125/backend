import { Router } from "express";
import { loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
import { refreshAccessToken } from "../controllers/user.controller.js";
console.log("🔄 Initializing User Router...");


const router = Router();

router.get("/test", (req, res) => {
    console.log("✔️ /test route hit");

    res.send("API working!");
});
router.route("/register").post(
    upload.fields([
        {
            name: "avatar",
            maxCount: 1 //how many you want to accpet it can be 2/3/4...
        },
        {
            name: "coverImage",
            maxCount: 1 //how many you want to accpet it can be 2/3/4...
        }
    ]),
    registerUser
);//POST method used here
//router.route("/login").post(login); //POST method used here
console.log("User Router Ready!");


router.route("/login").post(loginUser);

//secured routes
router.route("/logout").post(verifyJWT, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
export default router;