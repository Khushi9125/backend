import { Router } from "express";
import { registerUser } from "../controllers/user.controller.js";
console.log("🔄 Initializing User Router...");


const router = Router();

router.get("/test", (req, res) => {
    console.log("✔️ /test route hit");

    res.send("API working!");
});
router.route("/register").post(registerUser);//POST method used here
//router.route("/login").post(login); //POST method used here
console.log("User Router Ready!");

export default router;