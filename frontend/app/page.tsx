"use client"

import Link from "next/link"
import { BookOpen, Dumbbell, Brain, Flame, BarChart3 } from "lucide-react"

export default function HomePage() {

return (

<main className="bg-gradient-to-b from-white via-orange-50 to-white">

{/* HERO */}

<section className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-10 items-center">

<div>

<h1 className="text-5xl font-bold leading-tight">

Build Better Habits  
<span className="text-orange-500">Every Day</span>

</h1>

<p className="text-slate-600 mt-4 text-lg">

Track your habits, build streaks, and analyze your progress with a modern habit tracking system.

</p>

<div className="flex gap-4 mt-6">

<Link
href="/signup"
className="bg-orange-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-600"
>
Start Tracking
</Link>

<Link
href="/analytics"
className="border border-orange-500 text-orange-500 px-6 py-3 rounded-lg font-semibold hover:bg-orange-50"
>
View Analytics
</Link>

</div>

</div>


{/* HERO CARD */}

<div className="bg-white border border-orange-100 rounded-xl shadow p-6">

<h3 className="font-semibold mb-4 text-slate-700">
Today's Habits
</h3>

<div className="space-y-3 text-sm">

<div className="flex justify-between">
<span>Exercise</span>
<span className="text-green-500">Completed</span>
</div>

<div className="flex justify-between">
<span>Reading</span>
<span className="text-green-500">Completed</span>
</div>

<div className="flex justify-between">
<span>Meditation</span>
<span className="text-slate-400">Pending</span>
</div>

</div>

</div>

</section>


{/* HABIT IDEAS */}

<section className="max-w-7xl mx-auto px-6 py-14">

<h2 className="text-2xl font-bold mb-8 text-center">

Popular Habits People Track

</h2>

<div className="grid md:grid-cols-4 gap-6">

<article className="bg-white border border-orange-100 p-5 rounded-xl shadow-sm">

<BookOpen className="text-orange-500 mb-3"/>

<h3 className="font-semibold">
Reading
</h3>

<p className="text-sm text-slate-600 mt-1">
Read books daily to improve knowledge.
</p>

</article>


<article className="bg-white border border-orange-100 p-5 rounded-xl shadow-sm">

<Dumbbell className="text-orange-500 mb-3"/>

<h3 className="font-semibold">
Workout
</h3>

<p className="text-sm text-slate-600 mt-1">
Exercise daily to stay healthy and active.
</p>

</article>


<article className="bg-white border border-orange-100 p-5 rounded-xl shadow-sm">

<Brain className="text-orange-500 mb-3"/>

<h3 className="font-semibold">
Meditation
</h3>

<p className="text-sm text-slate-600 mt-1">
Practice mindfulness and mental clarity.
</p>

</article>


<article className="bg-white border border-orange-100 p-5 rounded-xl shadow-sm">

<Flame className="text-orange-500 mb-3"/>

<h3 className="font-semibold">
Consistency
</h3>

<p className="text-sm text-slate-600 mt-1">
Build streaks and maintain motivation.
</p>

</article>

</div>

</section>


{/* FEATURES */}

<section className="bg-orange-50 py-14">

<div className="max-w-6xl mx-auto px-6">

<h2 className="text-2xl font-bold text-center mb-10">

Why Use Our Habit Tracker

</h2>

<div className="grid md:grid-cols-3 gap-8 text-center">

<article>

<BarChart3 className="text-orange-500 mx-auto mb-3"/>

<h3 className="font-semibold">
Analytics Dashboard
</h3>

<p className="text-sm text-slate-600 mt-1">
View progress charts and insights.
</p>

</article>


<article>

<Flame className="text-orange-500 mx-auto mb-3"/>

<h3 className="font-semibold">
Streak System
</h3>

<p className="text-sm text-slate-600 mt-1">
Stay motivated with streak tracking.
</p>

</article>


<article>

<BookOpen className="text-orange-500 mx-auto mb-3"/>

<h3 className="font-semibold">
Habit Management
</h3>

<p className="text-sm text-slate-600 mt-1">
Add, edit, and track daily habits easily.
</p>

</article>

</div>

</div>

</section>


{/* CTA */}

<section className="text-center py-16">

<h2 className="text-3xl font-bold">

Start Building Better Habits Today

</h2>

<p className="text-slate-600 mt-3">
Track habits and improve your lifestyle.
</p>

<Link
href="/signup"
className="inline-block mt-6 bg-orange-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-orange-600"
>

Create Free Account

</Link>

</section>


</main>

)

}