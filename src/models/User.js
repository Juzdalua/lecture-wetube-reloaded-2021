import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema({
    email: { type: String, required: true, unique: true},
    username: { type: String, required: true, unique: true},
    password: { type: String, required: true, unique: true},   
    name: { type:String, required: true },
    location: String
});

userSchema.pre('save', async function(){
    this.password = await bcrypt.hash(this.password, 5);
    // bcrypt.hash(myPlaintextPassword, saltRounds, function(err, hash) {
    //     // Store hash in your password DB. => 5번 hashing
    // });    
});

const User = mongoose.model("User", userSchema);
export default User;