
"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import {
LineChart,
Line,
XAxis,
YAxis,
CartesianGrid,
Tooltip,
ResponsiveContainer,
BarChart,
Bar,
PieChart,
Pie,
Cell,
Legend
} from "recharts"


export default function AnalyticsPage(){

const [range,setRange] = useState("weekly")

const [kpi,setKpi] = useState({
totalCompleted:0,
streak:0,
completionRate:0
})

const [chartData,setChartData] = useState([])
const [pieData,setPieData] = useState([])
const [monthlyData,setMonthlyData] = useState([])


useEffect(()=>{

fetchAnalytics()

},[range])


async function fetchAnalytics(){

try{

const token = localStorage.getItem("token")

const res = await axios.get(
`${process.env.NEXT_PUBLIC_API_URL}/analytics?range=${range}`,
{
headers:{
Authorization:`Bearer ${token}`
}
}
)

const data = res.data

setKpi(data.kpi)

setChartData(
data.chart.map(item=>({
day:item.label,
completed:item.completed
}))
)

setPieData(data.pie)

setMonthlyData(data.monthly)

}catch(err){
console.log(err)
}

}



return(

<div className="min-h-screen bg-linear-to-br from-yellow-50 via-amber-50 to-white p-6">

<div className="max-w-7xl mx-auto space-y-8">


{/* KPI */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

<div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">

<p className="text-sm text-slate-500">
Total Habits Completed
</p>

<h2 className="text-3xl font-bold text-orange-500 mt-2">
{kpi.totalCompleted}
</h2>

</div>


<div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">

<p className="text-sm text-slate-500">
Current Streak
</p>

<h2 className="text-3xl font-bold text-orange-500 mt-2">
🔥 {kpi.streak} days
</h2>

</div>


<div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">

<p className="text-sm text-slate-500">
Completion Rate
</p>

<h2 className="text-3xl font-bold text-orange-500 mt-2">
{kpi.completionRate}%
</h2>

</div>

</div>



{/* RANGE FILTER */}

<div className="flex flex-wrap gap-3">

{["daily","weekly","monthly","yearly"].map(item=>(

<button
key={item}
onClick={()=>setRange(item)}
className={`px-4 py-2 rounded-lg text-sm font-semibold transition
${range===item
? "bg-orange-500 text-white"
: "bg-orange-100 text-orange-600 hover:bg-orange-200"}
`}
>

{item.toUpperCase()}

</button>

))}

</div>



{/* CHARTS ROW 1 */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


{/* DAILY LINE */}

<div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">

<h2 className="font-bold mb-4 text-slate-700">
Daily Habit Progress
</h2>

<ResponsiveContainer width="100%" height={300}>

<LineChart data={chartData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>

<Line
type="monotone"
dataKey="completed"
stroke="#f97316"
strokeWidth={3}
/>

</LineChart>

</ResponsiveContainer>

</div>



{/* WEEKLY BAR */}

<div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">

<h2 className="font-bold mb-4 text-slate-700">
Weekly Completion
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={chartData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="day"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="completed"
fill="#f97316"
/>

</BarChart>

</ResponsiveContainer>

</div>


</div>



{/* CHART ROW 2 */}

<div className="grid grid-cols-1 lg:grid-cols-2 gap-8">


{/* PIE */}

<div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">

<h2 className="font-bold mb-4 text-slate-700">
Completion Ratio
</h2>

<ResponsiveContainer width="100%" height={300}>

<PieChart>

<Pie
data={pieData}
dataKey="value"
nameKey="name"
innerRadius={80}
outerRadius={110}
>

{pieData.map((entry,index)=>(
<Cell
key={index}
fill={index===0 ? "#f97316" : "#fed7aa"}
/>
))}

</Pie>

<Tooltip/>

<Legend/>

</PieChart>

</ResponsiveContainer>

</div>



{/* MONTHLY BAR */}

<div className="bg-white p-6 rounded-2xl border border-orange-100 shadow-sm">

<h2 className="font-bold mb-4 text-slate-700">
Monthly Activity
</h2>

<ResponsiveContainer width="100%" height={300}>

<BarChart data={monthlyData}>

<CartesianGrid strokeDasharray="3 3"/>

<XAxis dataKey="month"/>

<YAxis/>

<Tooltip/>

<Bar
dataKey="completed"
fill="#fb923c"
/>

</BarChart>

</ResponsiveContainer>

</div>

</div>

</div>

</div>

)

}

