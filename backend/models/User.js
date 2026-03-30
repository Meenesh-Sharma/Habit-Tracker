// import mongoose from "mongoose"

// const userSchema = new mongoose.Schema({

// name:String,

// email:{
// type:String,
// unique:true
// },

// password:String,

// age:Number,

// gender:String,

// phone:String

// },{
// timestamps:true
// })

// export default mongoose.model("User",userSchema) 


import mongoose from "mongoose"

const userSchema = new mongoose.Schema({

name:{
type:String,
required:true
},

email:{
type:String,
required:true,
unique:true
},

password:{
type:String,
required:true
},

age:Number,

gender:{
type:String,
enum:["male","female","other"]
},

phone:String,

isActive:{
type:Boolean,
default:true
}

},{
timestamps:true
})

export default mongoose.model("User",userSchema)