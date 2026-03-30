

import User from "../models/User.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"


export const register = async (req,res)=>{

try{

const {name,email,password,age,gender,phone} = req.body

const existUser = await User.findOne({email})

if(existUser){
return res.status(400).json({message:"User already exists"})
}

const hash = await bcrypt.hash(password,10)

const user = await User.create({
name,
email,
password:hash,
age,
gender,
phone
})

/* CREATE TOKEN */

const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{ expiresIn:"7d" }
)

res.json({
token,
user
})

}catch(err){
res.status(500).json({message:err.message})
}

}



/* LOGIN */

export const login = async(req,res)=>{

try{

const {email,password} = req.body

const user = await User.findOne({email})

if(!user){
return res.status(400).json({message:"User not found"})
}

const match = await bcrypt.compare(password,user.password)

if(!match){
return res.status(400).json({message:"Invalid password"})
}

/* REACTIVATE ACCOUNT IF DEACTIVATED */

if(user.isActive === false){
user.isActive = true
await user.save()
}

const token = jwt.sign(
{ id:user._id },
process.env.JWT_SECRET,
{ expiresIn:"7d" }
)

res.json({
token,
user
})

}catch(err){
res.status(500).json({message:err.message})
}

}



/* GET CURRENT USER */

export const getMe = async(req,res)=>{

try{

const user = await User.findById(req.user.id).select("-password")

res.json(user)

}catch(err){
res.status(500).json(err)
}

}



/* UPDATE PROFILE */

export const updateProfile = async(req,res)=>{

try{

const {name,email,phone,age,gender} = req.body

const user = await User.findByIdAndUpdate(
req.user.id,
{name,email,phone,age,gender},
{new:true}
).select("-password")

res.json(user)

}catch(err){
res.status(500).json(err)
}

}



/* CHANGE PASSWORD */

export const changePassword = async(req,res)=>{

try{

const {currentPassword,newPassword} = req.body

const user = await User.findById(req.user.id)

const match = await bcrypt.compare(
currentPassword,
user.password
)

if(!match){
return res.status(400).json({
message:"Current password incorrect"
})
}

const hash = await bcrypt.hash(newPassword,10)

user.password = hash

await user.save()

res.json({
message:"Password updated"
})

}catch(err){
res.status(500).json(err)
}

}



/* DEACTIVATE ACCOUNT (FREEZE) */

export const deactivateAccount = async(req,res)=>{

try{

const user = await User.findByIdAndUpdate(
req.user.id,
{isActive:false},
{new:true}
)

res.json({
message:"Account deactivated"
})

}catch(err){
res.status(500).json(err)
}

}



/* DELETE ACCOUNT */

export const deleteAccount = async(req,res)=>{

try{

await User.findByIdAndDelete(req.user.id)

res.json({
message:"Account deleted permanently"
})

}catch(err){
res.status(500).json(err)
}

}