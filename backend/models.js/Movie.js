import mongoose from 'mongoose';

const MovieSchema = new mongoose.Schema({
  _id:{
    type: String,
    required:true
  },
  title:{
    type:String,
    required:true
  },
   overview:{
    type:String,
    required:true
  },
   poster_path:{
    type:String,
    required:true
  },
   backdrop_path:{
    type:String,
    required:true
  },
   release_date:{
    type:String,
    required:true
  },
  original_language:{
    type:String,
  },
   tag_line:{
    type:String
  },
   genres:{
    type:Array,
    required:true
  },
   casts:{
    type:Array,
    required:true
  },
   vote_average:{
    type:Number,
    required:true
  },
   run_time:{
    type:Number,
    required:true
  },
   movie_trailer:{
    type:String,
    required:true
  }
},{timestamps:true});

const Movie = mongoose.model("Movie", MovieSchema);

export default Movie;