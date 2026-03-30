
"use client"

import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Activity, Loader2 } from "lucide-react"

export default function LoginPage() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({ email: "", password: "" })

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: any) => {
    e.preventDefault()
    if (!form.email || !form.password) {
      alert("Please fill all fields")
      return
    }

    try {
      setLoading(true)
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, form)

      // --- THE FIX ---
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("isLoggedIn", "true") // Tell Header we are logged in
     localStorage.setItem("user", JSON.stringify(res.data.user))// Get name from API response

      // Use window.location to force Header to see the new localStorage data
      window.location.href = "/" 
    } catch (err: any) {
      console.error(err)
      alert(err.response?.data?.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-amber-50/50 p-6">
      <Card className="grid md:grid-cols-2 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-none">
        <div className="p-10 bg-white">
          <h1 className="text-3xl font-bold mb-8 flex items-center gap-2 text-orange-500">
            <Activity /> Habit Tracker
          </h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="flex items-center gap-2">
              <Mail size={18} className="text-slate-400" />
              <Input name="email" type="email" placeholder="Email" onChange={handleChange} required />
            </div>
            <div className="flex items-center gap-2">
              <Lock size={18} className="text-slate-400" />
              <Input name="password" type="password" placeholder="Password" onChange={handleChange} required />
            </div>
            <Button type="submit" disabled={loading} className="w-full bg-orange-500 hover:bg-orange-600 py-6 rounded-xl">
              {loading ? <Loader2 className="animate-spin" /> : "Login"}
            </Button>
          </form>
          <p className="text-sm text-center mt-6">
            Don't have an account? <Link href="/register" className="text-orange-500 font-bold">Register</Link>
          </p>
        </div>
        <div className="hidden md:flex flex-col justify-center items-center text-center p-10 text-white bg-linear-to-br from-amber-400 to-orange-500">
          <Activity size={70} className="mb-6" />
          <h2 className="text-3xl font-bold mb-4">Welcome Back</h2>
          <p className="text-lg opacity-90">Consistency beats motivation. Stay on track!</p>
        </div>
      </Card>
    </div>
  )
}