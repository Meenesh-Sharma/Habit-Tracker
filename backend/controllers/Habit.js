import Habit from "../models/Habit.js"
import HabitLog from "../models/HabitLog.js"


// ADD HABIT (MAX 10)

export const addHabit = async (req,res)=>{

try{

const {title,hours} = req.body

const count = await Habit.countDocuments({
userId:req.user.id
})

if(count >= 10){
return res.status(400).json({
message:"Maximum 10 habits allowed"
})
}

const habit = await Habit.create({
userId:req.user.id,
title,
hours
})

res.status(201).json(habit)

}catch(err){
res.status(500).json({message:err.message})
}

}



// GET HABITS

export const getHabits = async (req,res)=>{

try{

const habits = await Habit.find({
userId:req.user.id
})

res.json(habits)

}catch(err){
res.status(500).json({message:err.message})
}

}



// UPDATE HABIT

export const updateHabit = async (req,res)=>{

try{

const habit = await Habit.findByIdAndUpdate(
req.params.id,
req.body,
{new:true}
)

res.json(habit)

}catch(err){
res.status(500).json({message:err.message})
}

}



// DELETE HABIT

export const deleteHabit = async (req,res)=>{

try{

await Habit.findByIdAndDelete(req.params.id)

res.json({
message:"Habit deleted"
})

}catch(err){
res.status(500).json({message:err.message})
}

}



// COMPLETE HABIT

export const completeHabit = async (req,res)=>{

try{

const {habitId} = req.body

const today = new Date().toISOString().slice(0,10)

let log = await HabitLog.findOne({
habitId,
date:today
})

if(log){
log.completed = !log.completed
await log.save()
}else{

log = await HabitLog.create({
habitId,
userId:req.user.id,
date:today,
completed:true
})

}

res.json(log)

}catch(err){
res.status(500).json({message:err.message})
}

}



// GET 14 DAY PROGRESS

export const getProgress = async (req,res)=>{

try{

const habits = await Habit.find({
userId:req.user.id
})

const days = []

for(let i=13;i>=0;i--){

const d = new Date()
d.setDate(d.getDate()-i)

days.push(d.toISOString().slice(0,10))

}

const result = []

for(const habit of habits){

const logs = await HabitLog.find({
habitId:habit._id,
date:{$in:days}
})

const map = {}

logs.forEach(l=>{
map[l.date] = l.completed
})

const progress = days.map(d=>map[d] || false)

result.push({
habitId:habit._id,
title:habit.title,
progress
})

}

res.json({
days,
habits:result
})

}catch(err){
res.status(500).json({message:err.message})
}

}