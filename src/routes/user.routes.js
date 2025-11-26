import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
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

export default router;