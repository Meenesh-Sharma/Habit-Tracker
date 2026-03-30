

"use client"

import { Card } from "@/components/ui/card"
import { BarChart3 } from "lucide-react"

export default function HabitAnalytics({ habits }: any) {

return(

<Card className="p-5">

<h2 className="text-lg font-semibold text-orange-500 mb-4 flex gap-2 items-center">
<BarChart3 size={18}/>
Habit Analysis
</h2>

<div className="space-y-4">

{habits.map((habit:any,index:number)=>{

const total = habit.tracker.length

const completed =
habit.tracker.filter((d:boolean)=>d).length

const rate = Math.round((completed/total)*100)

return(

<div key={index} className="border-b pb-3">

<div className="flex justify-between font-medium">

<span>{habit.name}</span>

<span>
{completed}/{total}
</span>

</div>

<div className="w-full bg-gray-200 rounded-full h-2 mt-2">

<div
className="bg-orange-500 h-2 rounded-full"
style={{ width:`${rate}%` }}
/>

</div>

<p className="text-xs text-gray-600 mt-1">
Success Rate: {rate}%
</p>

</div>

)

})}

</div>

</Card>

)

}