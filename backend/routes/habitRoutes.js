import express from "express"

import {
addHabit,
getHabits,
updateHabit,
deleteHabit,
completeHabit,
getProgress
} from "../controllers/Habit.js"

import { authMiddleware } from "../middleware/authMiddleware.js"

const router = express.Router()


// ADD HABIT
router.post("/",authMiddleware,addHabit)

// GET ALL HABITS
router.get("/",authMiddleware,getHabits)

// GET 14 DAY PROGRESS
router.get("/progress",authMiddleware,getProgress)

// UPDATE HABIT
router.put("/:id",authMiddleware,updateHabit)

// DELETE HABIT
router.delete("/:id",authMiddleware,deleteHabit)

// COMPLETE HABIT
router.post("/complete",authMiddleware,completeHabit)

export default router