import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    avatarUrl: String,
    socialOnly: { type: Boolean, default: false },
    username: { type: String, required: true, unique: true},
    password: { type: String, unique: true},   
    name: { type:String, required: true },
    location: String,
    videos: [{type:mongoose.Schema.Types.ObjectId, ref:"Video"}]
});

//비밀번호가 수정될때만 작동하는 middleware
userSchema.pre('save', async function(){
    if(this.isModified())
        this.password = await bcrypt.hash(this.password, 5);
    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //     // Store hash in your password DB. => 5번 hashing
    // });    
});

const User = mongoose.model("User", userSchema);
export default User;