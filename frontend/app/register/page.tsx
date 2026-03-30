
"use client"

import { useState } from "react"
import axios from "axios"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

import {
  User,
  Mail,
  Lock,
  Phone,
  Calendar,
  VenusAndMars,
  Activity,
  Loader2
} from "lucide-react"

export default function RegisterPage() {

  const router = useRouter()

  const [loading,setLoading] = useState(false)

  const [form,setForm] = useState({
    name:"",
    age:"",
    email:"",
    phone:"",
    gender:"",
    password:"",
    confirmPassword:""
  })

  const handleChange = (e:React.ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
    setForm({
      ...form,
      [e.target.name]:e.target.value
    })
  }


const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault()

    const {name,age,email,phone,gender,password,confirmPassword} = form

    if(!name || !age || !email || !phone || !gender || !password){
      alert("Please fill all fields")
      return
    }

    if(password !== confirmPassword){
      alert("Passwords do not match")
      return
    }

    try {
      setLoading(true)

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        { name, age, email, phone, gender, password }
      )

      /* 1. SAVE DATA */
      localStorage.setItem("token", res.data.token)
      localStorage.setItem("user", JSON.stringify(res.data.user))
      localStorage.setItem("isLoggedIn", "true") // Added to match common navbar checks

      /* 2. FORCE REFRESH REDIRECT */
      // window.location.href is better than router.push here 
      // because it forces the Navbar to re-read localStorage
      window.location.href = "/"

    } catch (err: any) {
      console.error(err)
      const errorMsg = err.response?.data?.message || "Registration failed"
      alert(errorMsg)
    } finally {
      setLoading(false)
    }
  }


  return (

    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-yellow-50 via-amber-50 to-white p-6">

      <Card className="grid md:grid-cols-2 w-full max-w-5xl rounded-3xl overflow-hidden shadow-2xl border-none">


        {/* LEFT SIDE */}

        <div className="p-10 bg-white">

          <h1 className="text-3xl font-bold mb-6 flex items-center gap-2 text-orange-500">
            <Activity className="text-orange-500"/> Habit Tracker
          </h1>


          <form onSubmit={handleSubmit} className="space-y-4">


            <div className="flex items-center gap-2">
              <User size={18} className="text-slate-400"/>
              <Input
              name="name"
              placeholder="Full name"
              onChange={handleChange}
              required
              />
            </div>


            <div className="flex items-center gap-2">
              <Calendar size={18} className="text-slate-400"/>
              <Input
              name="age"
              type="number"
              placeholder="Age"
              onChange={handleChange}
              required
              />
            </div>


            <div className="flex items-center gap-2">
              <Mail size={18} className="text-slate-400"/>
              <Input
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
              />
            </div>


            <div className="flex items-center gap-2">
              <Phone size={18} className="text-slate-400"/>
              <Input
              name="phone"
              placeholder="Phone number"
              onChange={handleChange}
              required
              />
            </div>


            <div className="flex items-center gap-2">

              <VenusAndMars size={18} className="text-slate-400"/>

              <select
              name="gender"
              onChange={handleChange}
              required
              className="w-full border rounded-md p-2 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
              >

                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>

              </select>

            </div>


            <div className="flex items-center gap-2">
              <Lock size={18} className="text-slate-400"/>
              <Input
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
              />
            </div>


            <div className="flex items-center gap-2">
              <Lock size={18} className="text-slate-400"/>
              <Input
              name="confirmPassword"
              type="password"
              placeholder="Confirm password"
              onChange={handleChange}
              required
              />
            </div>


            <Button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-xl"
            >

              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin"/>
                  Creating Account...
                </>
              ) : (
                "Register"
              )}

            </Button>


          </form>


          <p className="text-sm text-center mt-6 text-slate-600">

            Already have an account?{" "}

            <Link
            href="/login"
            className="text-orange-500 font-bold hover:underline"
            >
              Login
            </Link>

          </p>

        </div>



        {/* RIGHT SIDE */}

        <div className="hidden md:flex flex-col justify-center items-center text-center p-10 text-white bg-linear-to-br from-amber-400 to-orange-500">

          <Activity size={80} className="mb-6 animate-pulse"/>

          <h2 className="text-4xl font-bold mb-4">
            Build Powerful Habits
          </h2>

          <p className="text-lg opacity-90 max-w-xs">
            Track your daily goals and stay consistent.
            Small progress every day leads to big success.
          </p>

        </div>


      </Card>

    </div>

  )

}