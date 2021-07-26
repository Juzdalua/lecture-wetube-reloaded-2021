import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
    // validation은 html과 db 모두 작성.
    title: { type:String, required: true, trim:true, maxLength:80},
    description: { type:String, minLength:20 },
    createdAt: { type:Date, default: Date.now },
    hashtags: [{ type:String, trim:true }],
    meta: {
        views: { type:Number, default: 0},
        rating: { type:Number, default: 0}
    }
});

//middleware는 model보다 먼저 만들어야함.
videoSchema.static('formatHashtags', function (hashtags){
    return hashtags.split(",").map( (word) => word.startsWith("#") ? word : `#${word}`);
    // "String".split(",") => ,를 기점으로 배열에 String을 분리
    // array.map(word => `#${word}`) => 각 배열 인자마다 앞에 #을 달아줌            
});

// videoSchema.pre('save', async function(){
//     console.log(this) => console.log(video)    
// });
const Video = mongoose.model("Video", videoSchema);
export default Video;