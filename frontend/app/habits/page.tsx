
"use client"

import { useState, useEffect } from "react"
import axios from "axios"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

import { Plus, Trash2, Pencil, Clock, Activity } from "lucide-react"

interface Habit {
  _id: string;
  title: string;
  hours: number;
}
export default function HabitPage() {

const [habit,setHabit] = useState("")
const [time,setTime] = useState("")
const [editingId, setEditingId] = useState<string | null>(null);

const [habits,setHabits] = useState<Habit[]>([]);


// FETCH HABITS ON PAGE LOAD

useEffect(()=>{

fetchHabits()

},[])



const fetchHabits = async ()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.get(
`${process.env.NEXT_PUBLIC_API_URL}/habits`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setHabits(res.data)

}catch(err){
console.log(err)
}

}



// ADD HABIT

const addHabit = async ()=>{

if(habits.length >= 10){
alert("Maximum 10 habits allowed")
return
}

if(!habit || !time) return

try{

const token = localStorage.getItem("token")

const res = await axios.post(
`${process.env.NEXT_PUBLIC_API_URL}/habits`,
{
title:habit,
hours:Number(time)
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setHabits([...habits,res.data])

setHabit("")
setTime("")

}catch(err){
console.log(err)
}

}



// DELETE HABIT

const deleteHabit = async(id:any)=>{

try{

const token = localStorage.getItem("token")

await axios.delete(
`${process.env.NEXT_PUBLIC_API_URL}/habits/${id}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

setHabits(habits.filter(h=>h._id !== id))

}catch(err){
console.log(err)
}

}



// EDIT HABIT

const editHabit = (h: Habit) => {
  setHabit(h.title)
  setTime(h.hours.toString()) 
  setEditingId(h._id)
}



// UPDATE HABIT

const updateHabit = async()=>{

try{

const token = localStorage.getItem("token")

const res = await axios.put(
`${process.env.NEXT_PUBLIC_API_URL}/habits/${editingId}`,
{
title:habit,
hours:Number(time)
},
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

const updated = habits.map(h=>
h._id === editingId ? res.data : h
)

setHabits(updated)

setHabit("")
setTime("")
setEditingId(null)

}catch(err){
console.log(err)
}

}



return(

<div className="min-h-screen bg-linear-to-br from-yellow-50 via-amber-50 to-white p-6">

<div className="max-w-4xl mx-auto">


<h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-orange-500">
<Activity/> My Habits
</h1>



<Card className="p-6 mb-8">

<div className="grid md:grid-cols-3 gap-4">

<Input
placeholder="Habit name"
value={habit}
onChange={(e)=>setHabit(e.target.value)}
/>


<div className="flex items-center gap-2">

<Clock size={18} className="text-orange-500"/>

<Input
type="number"
placeholder="Hours (e.g. 2)"
value={time}
onChange={(e)=>setTime(e.target.value)}
min={0}
max={24}
/>

</div>


<Button
onClick={editingId ? updateHabit : addHabit}
className="bg-orange-500 hover:bg-orange-600 flex gap-2"
>

<Plus size={16}/>

{editingId ? "Update Habit" : "Add Habit"}

</Button>

</div>

<p className="text-sm text-gray-500 mt-2">
{habits.length}/10 habits added
</p>

</Card>



<div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

{habits.map((h)=>(

<Card
key={h._id}
className="p-5 flex flex-col justify-between hover:shadow-lg transition"
>

<div>

<h2 className="font-semibold text-lg text-orange-500">
{h.title}
</h2>

<p className="text-sm text-gray-600 flex items-center gap-2 mt-2">
<Clock size={16}/>
{h.hours} hrs
</p>

</div>

<div className="flex gap-3 mt-4">

<Button
variant="outline"
size="icon"
onClick={()=>editHabit(h)}
>
<Pencil size={16}/>
</Button>


<Button
variant="destructive"
size="icon"
onClick={()=>deleteHabit(h._id)}
>
<Trash2 size={16}/>
</Button>

</div>

</Card>

))}

</div>

</div>

</div>

)

}

