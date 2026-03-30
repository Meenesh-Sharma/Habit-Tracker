

"use client"

import { useState,useEffect } from "react"
import axios from "axios"
import { Check,Clock,BarChart3 } from "lucide-react"

export default function DashboardPage(){

const [habits,setHabits] = useState<any[]>([])
const [days,setDays] = useState<string[]>([])


// LOAD DATA FROM BACKEND

useEffect(()=>{

fetchProgress()

},[])

async function fetchProgress(){

try{

const token = localStorage.getItem("token")

const res = await axios.get(
`${process.env.NEXT_PUBLIC_API_URL}/habits/progress`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

const {days,habits} = res.data

const formatted = habits.map((h:any)=>({
_id:h.habitId,
name:h.title,
tracker:h.progress
}))

setHabits(formatted)
setDays(days)

}catch(err){
console.log(err)
}

}


// GENERATE LABELS

const getLast14Days = ()=>{

const labels = []

for(let i=13;i>=0;i--){

const date = new Date()
date.setDate(date.getDate()-i)

labels.push({
day:date.toLocaleDateString("en-US",{weekday:"short"}),
date:date.getDate()
})

}

return labels

}

const dayLabels = getLast14Days()

const todayIndex = 13



// DAILY ANALYSIS

const getDayAnalysis = ()=>{

const totalHabits = habits.length

return dayLabels.map((_,dayIndex)=>{

let completed = 0

habits.forEach(habit=>{
if(habit.tracker[dayIndex]) completed++
})

const rate = totalHabits === 0 ? 0 : Math.round((completed/totalHabits)*100)

return {completed,total:totalHabits,rate}

})

}

const dayAnalysis = getDayAnalysis()



// TOGGLE HABIT

async function toggleHabit(habitId:string,dayIndex:number){

if(dayIndex !== todayIndex) return

const updated = habits.map(habit=>{

if(habit._id === habitId){

const newTracker = [...habit.tracker]
newTracker[dayIndex] = !newTracker[dayIndex]

return {...habit,tracker:newTracker}

}

return habit

})

setHabits(updated)

try{

const token = localStorage.getItem("token")

await axios.post(
`${process.env.NEXT_PUBLIC_API_URL}/habits/complete`,
{habitId},
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

}catch(err){
console.log(err)
}

}



return(

<div className="min-h-screen bg-linear-to-br from-yellow-50 via-amber-50 to-white p-6">

<div className="max-w-7xl mx-auto bg-white rounded-xl shadow-lg border border-amber-100 overflow-hidden">


{/* HEADER */}

<div className="grid grid-cols-4 border-b bg-amber-50 text-orange-500 font-semibold text-sm">

<div className="col-span-1 p-4">
Habit
</div>

<div className="col-span-2 p-4 overflow-x-auto">

<p className="text-center text-xs font-semibold mb-2">
{new Date().toLocaleString("default",{month:"long"})}
</p>

<div className="grid grid-cols-14 gap-2 min-w-140 text-center">

{dayLabels.map((d,i)=>(
<div key={i} className="text-[10px] uppercase text-orange-400">

<p>{d.day}</p>

<p className="text-gray-700 font-semibold">
{d.date}
</p>

</div>
))}

</div>

</div>

<div className="col-span-1 p-4 flex justify-end items-center gap-2">

<BarChart3 size={16}/>
Analysis

</div>

</div>



{/* HABIT ROWS */}

{habits.map((habit)=>{

const total = habit.tracker.length
const completed = habit.tracker.filter(Boolean).length
const rate = total === 0 ? 0 : Math.round((completed/total)*100)

return(

<div
key={habit._id}
className="grid grid-cols-4 border-b items-center hover:bg-amber-50/40 transition"
>


{/* HABIT NAME */}

<div className="col-span-1 p-4">

<p className="font-semibold text-gray-800">
{habit.name}
</p>

</div>



{/* TRACKER */}

<div className="col-span-2 p-4 overflow-x-auto">

<div className="grid grid-cols-14 gap-2 min-w-140">

{habit.tracker.map((done:boolean,index:number)=>(

<button
key={index}
disabled={index !== todayIndex}
onClick={()=>toggleHabit(habit._id,index)}
className={`w-8 h-8 flex items-center justify-center rounded-md border transition
${done
? "bg-orange-500 border-orange-600 text-white"
: "bg-white border-amber-200 hover:border-orange-300"}
${index !== todayIndex ? "opacity-40 cursor-not-allowed" : ""}
`}
>

{done && <Check size={14}/>}

</button>

))}

</div>

</div>



{/* HABIT ANALYSIS */}

<div className="col-span-1 p-4 text-right">

<p className="text-xs font-bold text-gray-700">
{completed}/{total} days
</p>

<div className="w-full bg-amber-100 h-2 rounded mt-2 overflow-hidden">

<div
className="h-full bg-orange-500 transition-all duration-500"
style={{width:`${rate}%`}}
/>

</div>

<p className="text-xs text-orange-500 font-semibold mt-1">
{rate}% success
</p>

</div>

</div>

)

})}



{/* DAILY ANALYSIS */}

<div className="grid grid-cols-4 items-center bg-amber-50 border-t">

<div className="col-span-1 p-4 font-semibold text-gray-700">
Daily Analysis
</div>

<div className="col-span-2 p-4 overflow-x-auto">

<div className="grid grid-cols-14 gap-2 min-w-140">

{dayAnalysis.map((day,index)=>(

<div key={index} className="flex flex-col items-center">

<div className="w-8 h-20 bg-amber-100 rounded overflow-hidden flex items-end">

<div
className="w-full bg-orange-500 transition-all"
style={{height:`${day.rate}%`}}
/>

</div>

<p className="text-[10px] mt-1 text-gray-600">
{day.rate}%
</p>

</div>

))}

</div>

</div>

<div className="col-span-1 p-4 text-right">

<p className="text-xs text-gray-500">
Habit completion per day
</p>

</div>

</div>

</div>

</div>

)

}

