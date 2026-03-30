import Habit from "../models/Habit.js"
import HabitLog from "../models/HabitLog.js"

export const getAnalytics = async (req,res)=>{

try{

const {range="weekly"} = req.query

const habits = await Habit.find({
userId:req.user.id
})

const habitIds = habits.map(h=>h._id)

const logs = await HabitLog.find({
userId:req.user.id,
habitId:{$in:habitIds}
})


/* KPI */

const totalCompleted = logs.filter(l=>l.completed).length

const totalPossible = habits.length * 14

const completionRate = totalPossible
? Math.round((totalCompleted/totalPossible)*100)
:0



/* STREAK */

let streak = 0

for(let i=0;i<14;i++){

const date = new Date()
date.setDate(date.getDate()-i)

const d = date.toISOString().slice(0,10)

const dayLogs = logs.filter(l=>l.date===d && l.completed)

if(dayLogs.length>0){
streak++
}else{
break
}

}



/* RANGE BASED CHART */

let days = 14

if(range === "daily") days = 7
if(range === "weekly") days = 14
if(range === "monthly") days = 30
if(range === "yearly") days = 365

const chartData = []

for(let i=days-1;i>=0;i--){

const date = new Date()
date.setDate(date.getDate()-i)

const d = date.toISOString().slice(0,10)

const count = logs.filter(
l=>l.date === d && l.completed
).length

chartData.push({
label:d.slice(5),
completed:count
})

}



/* PIE DATA */

const pieData = [

{
name:"Completed",
value:totalCompleted
},

{
name:"Missed",
value:totalPossible-totalCompleted
}

]



/* MONTHLY DATA */

const monthlyMap = {}

logs.forEach(log=>{

const month = log.date.slice(0,7)

if(log.completed){

if(!monthlyMap[month]){
monthlyMap[month] = 0
}

monthlyMap[month]++

}

})

const monthlyData = Object.keys(monthlyMap).map(month=>({

month:month.slice(5),
completed:monthlyMap[month]

}))



res.json({

kpi:{
totalCompleted,
completionRate,
streak
},

chart:chartData,
pie:pieData,
monthly:monthlyData

})

}catch(err){

res.status(500).json({
message:err.message
})

}

}