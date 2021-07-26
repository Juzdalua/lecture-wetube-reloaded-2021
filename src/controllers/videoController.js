import Video from "../models/Video";

// database.find({형식}, 콜백함수 )
// Video.find({}, (error, videos) => {}); 
export const home = async(req, res) => {   
    try{
        const videos = await Video.find({}).sort({createdAt:"desc"}); //find all video and put array videos
        // db를 받을 때까지 await이 JS를 기다려줌
        return res.render("home", {pageTitle : "Home", videos});
    } catch(error){
        return res.render("server-error");
    }
};
// render(name of view, variable)
export const watch = async (req, res) => {
    const id = req.params.id;    //const {id} = req.params;
    const video = await Video.findById(id);
    if(!video){
        return res.render("404", {pageTitle:"Video not found"});        
    } 
    return res.render("watch", {pageTitle: video.title, video});
};
export const getEdit = async (req, res) => {
    const {id} = req.params;
    const video = await Video.findById(id);        
    if(video === null){
        return res.render("404", {pageTitle:"Video not found."})        
    } 
    return res.render("edit", {pageTitle:`Edit: ${video.title}`, video});
    
} ;
export const postEdit = async (req, res) =>{
    const {id} = req.params;
    const {title, description, hashtags} = req.body;
    const video = await Video.exists({_id:id}); // true or false   
    if(!video){
        return res.render("404", {pageTitle: "Video not found."});
    }
    await Video.findByIdAndUpdate(id, {
        title, description, hashtags:Video.formatHashtags(hashtags)
    }); 
    return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle : "Upload Video"});  
};
export const postUpload = async (req, res) => {    
    const {title, hashtags, description} = req.body; 
        
    // const video = new Video({ 
    //     title, // title: title
    //     description,
    //     createdAt: Date.now(),
    //     hashtags:hashtags.split(",").map(word => `#${word}`),
    //     // "String".split(",") => ,를 기점으로 배열에 String을 분리
    //     // array.map(word => `#${word}`) => 각 배열 인자마다 앞에 #을 달아줌
    //     meta:{
    //         views:0,
    //         rating:0,
    //     }   
    // }); 
    // const dbVideo = await video.save();
    
    try{
        await Video.create({
            title, // title: title
            description,            
            hashtags: Video.formatHashtags(hashtags)            
        }); 
        return res.redirect("/");
    } catch(error){
        return res.render("upload", {pageTitle : "Upload Video", errorMessage: error._message}); 
    }
};

export const deleteVideo = async (req, res) => {
    const {id} = req.params;
    await Video.findByIdAndDelete(id);
    return res.redirect("/");
};

export const search = async (req, res) =>{
    const {keyword} = req.query;
    let videos = [];
    if(keyword){
        videos = await Video.find({
            title:{
                $regex: new RegExp(keyword, "i") //i-대소문자 구분X
                //contain 정규식
            }
        });        
    }
    return res.render("search", {pageTitle:"Search", videos});
};