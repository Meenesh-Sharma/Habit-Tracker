import mongoose from "mongoose"

const habitSchema = new mongoose.Schema({

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

title:String,

hours:Number,

createdAt:{
type:Date,
default:Date.now
}

})

export default mongoose.model("Habit",habitSchema)