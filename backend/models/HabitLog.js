import mongoose from "mongoose"

const habitLogSchema = new mongoose.Schema({

habitId:{
type:mongoose.Schema.Types.ObjectId,
ref:"Habit"
},

userId:{
type:mongoose.Schema.Types.ObjectId,
ref:"User"
},

date:String,

completed:Boolean

})

export default mongoose.model("HabitLog",habitLogSchema)