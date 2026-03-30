"use client"

import { Card } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default function HabitList({ habits }: any) {

return (

<Card className="p-5">

<h2 className="font-semibold text-lg text-orange-500 mb-4">
My Habits
</h2>

<div className="space-y-3">

{habits.map((habit:any,index:number)=>(

<div
key={index}
className="flex justify-between items-center border-b pb-2"
>

<span className="font-medium">
{habit.name}
</span>

<span className="text-sm flex items-center gap-1 text-gray-600">
<Clock size={14}/>
{habit.hours}h
</span>

</div>

))}

</div>

</Card>

)

}