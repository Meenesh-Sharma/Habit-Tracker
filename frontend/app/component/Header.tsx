
// // // "use client"
// // // import Link from "next/link"
// // // import { useState } from "react"
// // // import { Activity, User, LayoutDashboard, BarChart3, CheckSquare } from "lucide-react"
// // // export default function Header() {
// // //   // later replace with auth state
// // //   const [isLoggedIn] = useState(true)
// // //   const [user] = useState({ name: "Sachin" })

// // //   return (

// // //     <>
// // //     <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
// // //       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
// // //         {/* BRAND */}
// // //         <Link
// // //           href="/"
// // //           className="flex items-center gap-2 text-xl font-bold text-orange-500"
// // //         >
// // //           <Activity />
// // //           HabitTrack
// // //         </Link>

// // //         {/* NAVIGATION */}

// // //         <nav className="flex items-center gap-6 text-sm font-medium">

// // //           {/* LOGGED IN LINKS */}

// // //           {isLoggedIn && (

// // //             <>
            
// // //             <Link
// // //               href="/dashboard"
// // //               className="flex items-center gap-1 hover:text-orange-500 transition"
// // //             >
// // //               <LayoutDashboard size={18}/>
// // //               Dashboard
// // //             </Link>

// // //             <Link
// // //               href="/habits"
// // //               className="flex items-center gap-1 hover:text-orange-500 transition"
// // //             >
// // //               <CheckSquare size={18}/>
// // //               Habits
// // //             </Link>

// // //             <Link
// // //               href="/analytics"
// // //               className="flex items-center gap-1 hover:text-orange-500 transition"
// // //             >
// // //               <BarChart3 size={18}/>
// // //               Analytics
// // //             </Link>

// // //             <Link
// // //               href="/profile"
// // //               className="flex items-center gap-1 hover:text-orange-500 transition"
// // //             >
// // //               <User size={18}/>
// // //               Profile
// // //             </Link>

// // //             </>

// // //           )}

// // //           {/* LOGIN / REGISTER */}

// // //           {!isLoggedIn && (

// // //             <>
            
// // //             <Link
// // //               href="/login"
// // //               className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
// // //             >
// // //               Login
// // //             </Link>

// // //             <Link
// // //               href="/register"
// // //               className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
// // //             >
// // //               Register
// // //             </Link>

// // //             </>

// // //           )}

// // //         </nav>

// // //       </div>

// // //     </header>


// // //     {/* WELCOME SECTION (ONLY AFTER LOGIN) */}

// // //     {isLoggedIn && (

// // //       <section className="bg-orange-50 border-b">

// // //         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

// // //           <div>

// // //             <h2 className="text-lg font-semibold text-slate-800">
// // //               Welcome back, {user.name} 👋
// // //             </h2>

// // //             <p className="text-sm text-slate-600">
// // //               Ready to complete your habits today?
// // //             </p>

// // //           </div>

// // //           <Link
// // //             href="/habits"
// // //             className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
// // //           >
// // //             View Habits
// // //           </Link>

// // //         </div>

// // //       </section>

// // //     )}

// // //     </>

// // //   )

// // // }  


// // "use client"
// // import Link from "next/link"
// // import { useState, useEffect } from "react"
// // import { useRouter } from "next/navigation"
// // import { Activity, User, LayoutDashboard, BarChart3, CheckSquare, LogOut } from "lucide-react"

// // export default function Header() {
// //   const router = useRouter()
// //   const [isLoggedIn, setIsLoggedIn] = useState(true)
// //   const [userName, setUserName] = useState("Guest")

// //   // Check for user data on component mount
// //   useEffect(() => {
// //     const savedName = localStorage.getItem("userName")
// //     const authStatus = localStorage.getItem("isLoggedIn")

// //     if (authStatus === "true" && savedName) {
// //       setIsLoggedIn(true)
// //       setUserName(savedName)
// //     }
// //   }, [])

// //   const handleLogout = () => {
// //     localStorage.removeItem("isLoggedIn")
// //     localStorage.removeItem("userName")
// //     setIsLoggedIn(false)
// //     router.push("/")
// //   }

// //   return (
// //     <>
// //       <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
// //         <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
// //           {/* BRAND */}
// //           <Link
// //             href="/"
// //             className="flex items-center gap-2 text-xl font-bold text-orange-500"
// //           >
// //             <Activity />
// //             HabitTrack
// //           </Link>

// //           {/* NAVIGATION */}
// //           <nav className="flex items-center gap-6 text-sm font-medium">
// //             {isLoggedIn ? (
// //               <>
// //                 <Link
// //                   href="/dashboard"
// //                   className="flex items-center gap-1 hover:text-orange-500 transition"
// //                 >
// //                   <LayoutDashboard size={18} />
// //                   Dashboard
// //                 </Link>

// //                 <Link
// //                   href="/habits"
// //                   className="flex items-center gap-1 hover:text-orange-500 transition"
// //                 >
// //                   <CheckSquare size={18} />
// //                   Habits
// //                 </Link>

// //                 <Link
// //                   href="/analytics"
// //                   className="flex items-center gap-1 hover:text-orange-500 transition"
// //                 >
// //                   <BarChart3 size={18} />
// //                   Analytics
// //                 </Link>

// //                 <Link
// //                   href="/profile"
// //                   className="flex items-center gap-1 hover:text-orange-500 transition"
// //                 >
// //                   <User size={18} />
// //                   Profile
// //                 </Link>

// //                 <button
// //                   onClick={handleLogout}
// //                   className="flex items-center gap-1 text-slate-600 hover:text-red-500 transition cursor-pointer"
// //                 >
// //                   <LogOut size={18} />
// //                   Logout
// //                 </button>
// //               </>
// //             ) : (
// //               <>
// //                 <Link
// //                   href="/login"
// //                   className="text-slate-600 hover:text-orange-500 transition"
// //                 >
// //                   Login
// //                 </Link>

// //                 <Link
// //                   href="/register"
// //                   className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
// //                 >
// //                   Register
// //                 </Link>
// //               </>
// //             )}
// //           </nav>
// //         </div>
// //       </header>

// //       {/* WELCOME SECTION (ONLY AFTER LOGIN) */}
// //       {isLoggedIn && (
// //         <section className="bg-orange-50 border-b">
// //           <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
// //             <div>
// //               <h2 className="text-lg font-semibold text-slate-800">
// //                 Welcome back, {userName} 👋
// //               </h2>
// //               <p className="text-sm text-slate-600">
// //                 Ready to complete your habits today?
// //               </p>
// //             </div>

// //             <Link
// //               href="/habits"
// //               className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
// //             >
// //               View Habits
// //             </Link>
// //           </div>
// //         </section>
// //       )}
// //     </>
// //   )
// // }  



// "use client"

// import Link from "next/link"
// import { useState, useEffect } from "react"
// import { useRouter } from "next/navigation"

// import {
//   Activity,
//   User,
//   LayoutDashboard,
//   BarChart3,
//   CheckSquare,
//   LogOut
// } from "lucide-react"

// export default function Header() {

//   const router = useRouter()

//   const [isLoggedIn,setIsLoggedIn] = useState(false)
//   const [user,setUser] = useState({name:"Guest"})


//   const checkAuth = ()=>{

//     const token = localStorage.getItem("token")
//     const savedName = localStorage.getItem("userName")

//     if(token){
//       setIsLoggedIn(true)

//       if(savedName){
//         setUser({name:savedName})
//       }

//     }else{
//       setIsLoggedIn(false)
//       setUser({name:"Guest"})
//     }

//   }


//   useEffect(()=>{

//     checkAuth()

//     // listen for login/logout changes
//     window.addEventListener("storage", checkAuth)

//     return ()=>{
//       window.removeEventListener("storage", checkAuth)
//     }

//   },[])



//   const handleLogout = ()=>{

//     localStorage.removeItem("token")
//     localStorage.removeItem("userName")

//     setIsLoggedIn(false)
//     setUser({name:"Guest"})

//     router.push("/login")
//     router.refresh()

//   }



//   return(

//     <>

//     <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">

//       <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

//         <Link
//           href="/"
//           className="flex items-center gap-2 text-xl font-bold text-orange-500"
//         >
//           <Activity/>
//           HabitTrack
//         </Link>


//         <nav className="flex items-center gap-6 text-sm font-medium">

//           {isLoggedIn && (

//             <>
            
//             <Link
//               href="/dashboard"
//               className="flex items-center gap-1 hover:text-orange-500 transition"
//             >
//               <LayoutDashboard size={18}/>
//               Dashboard
//             </Link>

//             <Link
//               href="/habits"
//               className="flex items-center gap-1 hover:text-orange-500 transition"
//             >
//               <CheckSquare size={18}/>
//               Habits
//             </Link>

//             <Link
//               href="/analytics"
//               className="flex items-center gap-1 hover:text-orange-500 transition"
//             >
//               <BarChart3 size={18}/>
//               Analytics
//             </Link>

//             <Link
//               href="/profile"
//               className="flex items-center gap-1 hover:text-orange-500 transition"
//             >
//               <User size={18}/>
//               Profile
//             </Link>

//             <button
//               onClick={handleLogout}
//               className="flex items-center gap-1 text-slate-600 hover:text-red-500 transition"
//             >
//               <LogOut size={18}/>
//               Logout
//             </button>

//             </>

//           )}


//           {!isLoggedIn && (

//             <>
            
//             <Link
//               href="/login"
//               className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
//             >
//               Login
//             </Link>

//             <Link
//               href="/register"
//               className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600 transition"
//             >
//               Register
//             </Link>

//             </>

//           )}

//         </nav>

//       </div>

//     </header>


//     {isLoggedIn && (

//       <section className="bg-orange-50 border-b">

//         <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

//           <div>

//             <h2 className="text-lg font-semibold text-slate-800">
//               Welcome back, {user.name} 👋
//             </h2>

//             <p className="text-sm text-slate-600">
//               Ready to complete your habits today?
//             </p>

//           </div>

//           <Link
//             href="/habits"
//             className="bg-orange-500 text-white px-4 py-2 rounded-lg hover:bg-orange-600"
//           >
//             View Habits
//           </Link>

//         </div>

//       </section>

//     )}

//     </>

//   )

// }



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

  const [isLoggedIn,setIsLoggedIn] = useState(false)
  const [user,setUser] = useState({name:"Guest"})


  const checkAuth = ()=>{

    const token = localStorage.getItem("token")
    const savedUser = localStorage.getItem("user")

    if(token){

      setIsLoggedIn(true)

      if(savedUser && savedUser !== "undefined"){

        try{

          const parsedUser = JSON.parse(savedUser)

          if(parsedUser?.name){
            setUser(parsedUser)
          }else{
            setUser({name:"Guest"})
          }

        }catch{
          setUser({name:"Guest"})
        }

      }

    }else{

      setIsLoggedIn(false)
      setUser({name:"Guest"})

    }

  }


  useEffect(()=>{

    checkAuth()

  },[])



  return(

    <>

    <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">

      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">

        <Link
          href="/"
          className="flex items-center gap-2 text-xl font-bold text-orange-500"
        >
          <Activity/>
          HabitTrack
        </Link>


        <nav className="flex items-center gap-6 text-sm font-medium">

          {isLoggedIn && (

            <>
            
            <Link
              href="/dashboard"
              className="flex items-center gap-1 hover:text-orange-500 transition"
            >
              <LayoutDashboard size={18}/>
              Dashboard
            </Link>

            <Link
              href="/habits"
              className="flex items-center gap-1 hover:text-orange-500 transition"
            >
              <CheckSquare size={18}/>
              Habits
            </Link>

            <Link
              href="/analytics"
              className="flex items-center gap-1 hover:text-orange-500 transition"
            >
              <BarChart3 size={18}/>
              Analytics
            </Link>

            <Link
              href="/profile"
              className="flex items-center gap-1 hover:text-orange-500 transition"
            >
              <User size={18}/>
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