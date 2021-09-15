import mongoose from "mongoose";

const commentShema = new mongoose.Schema({
    text:{type:String, required:true},
    owner:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"User"},
    video:{type:mongoose.Schema.Types.ObjectId, required:true, ref:"Video"},
    createAt: {type:Date, required:true, default:Date.now},
});

const Comment = mongoose.model("Comment", commentShema);
export default Comment;