


"use client"

import { useEffect, useState } from "react"
import axios from "axios"

import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
    Avatar,
    AvatarFallback
} from "@/components/ui/avatar"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger
} from "@/components/ui/dialog"

import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"

import {
    User,
    Mail,
    Phone,
    Calendar,
    Users,
    Edit,
    Lock,
    LogOut,
    Trash2,
    PauseCircle
} from "lucide-react"


export default function ProfilePage() {

    const [user, setUser] = useState<any>(null)

    const [editOpen, setEditOpen] = useState(false)
    const [passwordOpen, setPasswordOpen] = useState(false)

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [age, setAge] = useState("")
    const [gender, setGender] = useState("")

    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")


    useEffect(() => {
        fetchProfile()
    }, [])



    async function fetchProfile() {

        try {

            const token = localStorage.getItem("token")

            const res = await axios.get(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/me`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setUser(res.data)

            setName(res.data.name || "")
            setEmail(res.data.email || "")
            setPhone(res.data.phone || "")
            setAge(res.data.age || "")
            setGender(res.data.gender || "")

        } catch (err) {
            console.log(err)
        }

    }



    async function updateProfile() {

        try {

            const token = localStorage.getItem("token")

            const res = await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/update`,
                { name, email, phone, age, gender },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setUser(res.data)

            setEditOpen(false)

        } catch (err) {
            console.log(err)
        }

    }



    async function changePassword() {

        try {

            const token = localStorage.getItem("token")

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/change-password`,
                {
                    currentPassword,
                    newPassword
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            setPasswordOpen(false)

        } catch (err) {
            console.log(err)
        }

    }



    function logout() {

        localStorage.removeItem("token")

        window.location.href = "/login"

    }



    async function deactivateAccount() {

        const confirmAction = confirm("Deactivate your account?")

        if (!confirmAction) return

        try {

            const token = localStorage.getItem("token")

            await axios.put(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/deactivate`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            localStorage.removeItem("token")

            window.location.href = "/login"

        } catch (err) {
            console.log(err)
        }

    }



    async function deleteAccount() {

        const confirmAction = confirm("Delete account permanently?")

        if (!confirmAction) return

        try {

            const token = localStorage.getItem("token")

            await axios.delete(
                `${process.env.NEXT_PUBLIC_API_URL}/auth/delete`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            localStorage.removeItem("token")

            window.location.href = "/"

        } catch (err) {
            console.log(err)
        }

    }



    return (

        <div className="min-h-screen bg-linear-to-br from-yellow-50 via-orange-50 to-white p-6">

            <div className="max-w-6xl mx-auto space-y-8">

                <h1 className="text-3xl font-bold text-orange-500 flex items-center gap-2">
                    <User /> Profile & Settings
                </h1>



                <Tabs defaultValue="profile">

                    <TabsList className="grid grid-cols-2 w-full max-w-md">

                        <TabsTrigger value="profile">
                            Profile
                        </TabsTrigger>

                        <TabsTrigger value="security">
                            Security
                        </TabsTrigger>

                    </TabsList>



                    {/* PROFILE TAB */}

                    <TabsContent value="profile">

                        <Card className="shadow-lg border-orange-100 w-xl">

                            <CardHeader>
                                <CardTitle>
                                    Account Information
                                </CardTitle>
                            </CardHeader>


                            <CardContent className="flex flex-col md:flex-row gap-6 md:items-center">

                                <Avatar className="h-20 w-20 text-xl">

                                    <AvatarFallback className="bg-orange-100 text-orange-600">
                                        {user?.name?.charAt(0)}
                                    </AvatarFallback>

                                </Avatar>


                                <div className="flex-1 space-y-2">

                                    <p className="flex items-center gap-2">
                                        <User size={16} /> {user?.name}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Mail size={16} /> {user?.email}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Phone size={16} /> {user?.phone || "Not added"}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Calendar size={16} /> Age: {user?.age || "N/A"}
                                    </p>

                                    <p className="flex items-center gap-2">
                                        <Users size={16} /> Gender: {user?.gender || "N/A"}
                                    </p>

                                </div>



                                <Dialog open={editOpen} onOpenChange={setEditOpen}>

                                    <DialogTrigger asChild>

                                        <Button className="bg-orange-500 hover:bg-orange-600 flex gap-2">
                                            <Edit size={16} /> Edit
                                        </Button>

                                    </DialogTrigger>


                                    <DialogContent>

                                        <DialogHeader>
                                            <DialogTitle>Edit Profile</DialogTitle>
                                        </DialogHeader>


                                        <div className="space-y-4">

                                            <Input
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                placeholder="Name"
                                            />

                                            <Input
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                placeholder="Email"
                                            />

                                            <Input
                                                value={phone}
                                                onChange={(e) => setPhone(e.target.value)}
                                                placeholder="Phone"
                                            />

                                            <Input
                                                value={age}
                                                onChange={(e) => setAge(e.target.value)}
                                                placeholder="Age"
                                            />

                                            <Input
                                                value={gender}
                                                onChange={(e) => setGender(e.target.value)}
                                                placeholder="Gender"
                                            />

                                            <Button
                                                onClick={updateProfile}
                                                className="w-full bg-orange-500 hover:bg-orange-600"
                                            >

                                                Save Changes

                                            </Button>

                                        </div>

                                    </DialogContent>

                                </Dialog>

                            </CardContent>

                        </Card>


                       

                    </TabsContent>



                    {/* SECURITY TAB */}

                    <TabsContent value="security">

                         <div className="grid md:grid-cols-3 gap-6 mt-6">

                            <Card>
                                <CardContent className="p-6 flex flex-col gap-4">

                                    <h2 className="font-semibold">Logout</h2>

                                    <Button
                                        variant="outline"
                                        onClick={logout}
                                        className="flex gap-2"
                                    >

                                        <LogOut size={16} />
                                        Logout

                                    </Button>

                                </CardContent>
                            </Card>



                            <Card>
                                <CardContent className="p-6 flex flex-col gap-4">

                                    <h2 className="font-semibold text-yellow-600">
                                        Deactivate Account
                                    </h2>

                                    <Button
                                        variant="secondary"
                                        onClick={deactivateAccount}
                                        className="flex gap-2"
                                    >

                                        <PauseCircle size={16} />
                                        Deactivate

                                    </Button>

                                </CardContent>
                            </Card>



                            <Card>
                                <CardContent className="p-6 flex flex-col gap-4">

                                    <h2 className="font-semibold text-red-600">
                                        Delete Account
                                    </h2>

                                    <Button
                                        variant="destructive"
                                        onClick={deleteAccount}
                                        className="flex gap-2"
                                    >

                                        <Trash2 size={16} />
                                        Delete

                                    </Button>

                                </CardContent>
                            </Card>

                        </div>

                    </TabsContent>


                </Tabs>

            </div>

        </div>

    )

}


