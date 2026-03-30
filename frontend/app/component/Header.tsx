
"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

import {
  Activity,
  User,
  LayoutDashboard,
  BarChart3,
  CheckSquare
} from "lucide-react"

export default function Header() {

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState({ name: "Guest" })


  const checkAuth = () => {

    const token = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if (token) {

      setIsLoggedIn(true)

      if (savedUser && savedUser !== "undefined") {

        try {

          const parsedUser = JSON.parse(savedUser)

          if (parsedUser?.name) {
            setUser(parsedUser)
          } else {
            setUser({ name: "Guest" })
          }

        } catch {
          setUser({ name: "Guest" })
        }

      }

    } else {

      setIsLoggedIn(false)
      setUser({ name: "Guest" })

    }

  }


  useEffect(() => {

    checkAuth()

  }, [])



  return (

    <>

      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">

        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-bold text-orange-500"
          >
            <Activity />
            HabitTrack
          </Link>


          <nav className="flex items-center gap-6 text-sm font-medium">

            {isLoggedIn && (

              <>

                <Link
                  href="/dashboard"
                  className="flex items-center gap-1 hover:text-orange-500 transition"
                >
                  <LayoutDashboard size={18} />
                  Dashboard
                </Link>

                <Link
                  href="/habits"
                  className="flex items-center gap-1 hover:text-orange-500 transition"
                >
                  <CheckSquare size={18} />
                  Habits
                </Link>

                <Link
                  href="/analytics"
                  className="flex items-center gap-1 hover:text-orange-500 transition"
                >
                  <BarChart3 size={18} />
                  Analytics
                </Link>

                <Link
                  href="/profile"
                  className="flex items-center gap-1 hover:text-orange-500 transition"
                >
                  <User size={18} />
                  Profile
                </Link>

              </>

            )}


            {!isLoggedIn && (

              <>

                <Link
                  href="/login"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
                >
                  Register
                </Link>

              </>

            )}

          </nav>

        </div>

      </header>


      {isLoggedIn && (

        <section className="bg-orange-50 border-b">

          <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

            <div>

              <h2 className="text-lg font-semibold text-slate-800">
                Welcome back, {user.name} 👋
              </h2>

              <p className="text-sm text-slate-600">
                Ready to complete your habits today?
              </p>

            </div>

            <Link
              href="/habits"
              className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
            >
              View Habits
            </Link>

          </div>

        </section>

      )}

    </>

  )

}