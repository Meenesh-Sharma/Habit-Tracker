import express from "express"

import {
register,
login,
getMe,
updateProfile,
changePassword,
deactivateAccount,
deleteAccount
} from "../controllers/User.js"

import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()


/* AUTH */

router.post("/register",register)
router.post("/login",login)


/* PROFILE */

router.get("/me",authMiddleware,getMe)

router.put("/update",authMiddleware,updateProfile)


/* PASSWORD */

router.put("/change-password",authMiddleware,changePassword)


/* ACCOUNT CONTROL */

router.put("/deactivate",authMiddleware,deactivateAccount)

router.delete("/delete",authMiddleware,deleteAccount)


export default router