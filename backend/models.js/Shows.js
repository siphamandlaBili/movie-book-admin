import mongoose from "mongoose";

const ShowsSchema = new mongoose.Schema({
 movie:{
    type:String,
    required:true,
    ref:"Movie"
 },
  showDateTime:{
    type:Date,
    required:true,
 },
  showPrice:{
    type:Number,
    required:true,
 },
 occupiedSeats:{
    type:Object,
    default:{},
 }
},{minimise:false})

const Shows= mongoose.model("Shows",ShowsSchema);

export default Shows;