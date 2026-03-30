"use client"

import Link from "next/link"
import { Activity, Github, Twitter, Linkedin } from "lucide-react"

export default function Footer() {

  return (

    <footer className="bg-white border-t mt-20">

      {/* TOP SECTION */}

      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-3 gap-10">

        {/* BRAND */}

        <div>

          <div className="flex items-center gap-2 text-xl font-bold text-orange-500">
            <Activity />
            HabitTrack
          </div>

          <p className="text-sm  mt-4 leading-relaxed text-orange-500">
            Build better habits and stay consistent with your daily goals.
            Small improvements every day lead to big success.
          </p>

        </div>


        {/* QUICK LINKS */}

        <div>

          <h3 className="font-semibold mb-4 text-orange-500">Quick Links</h3>

          <div className="flex flex-col gap-2 text-sm">

            <Link href="/" className="relative group w-fit text-orange-500">
              Home
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>

            <Link href="/login" className="relative group w-fit text-orange-500">
              Login
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>

            <Link href="/register" className="relative group w-fit text-orange-500">
              Register
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>

            <Link href="/dashboard" className="relative group w-fit text-orange-500">
              Dashboard
              <span className="absolute left-0 -bottom-1 w-0 h-0.5 bg-orange-500 transition-all group-hover:w-full"></span>
            </Link>

          </div>

        </div>


        {/* SOCIAL LINKS */}

        <div>

          <h3 className="font-semibold mb-4 text-orange-500">Connect</h3>

          <div className="flex gap-4 text-orange-500">

            <a
              href="#"
              className="hover:text-gray-600 transition"
            >
              <Github />
            </a>

             <a
              href="#"
              className="hover:text-gray-600 transition"
            >
              <Twitter />
            </a>

            <a
              href="#"
              className="hover:text-gray-600 transition"
            >
              <Linkedin />
            </a>

          </div>

        </div>

      </div>


      {/* BOTTOM SECTION */}

      <div className="border-t">

        <div className="max-w-7xl mx-auto px-6 py-4 text-center text-sm text-orange-500">

          © {new Date().getFullYear()} HabitTrack. All rights reserved.

        </div>

      </div>

    </footer>

  )
}