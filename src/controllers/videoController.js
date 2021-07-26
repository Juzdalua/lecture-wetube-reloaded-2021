import Video from "../models/Video";

// database.find({형식}, 콜백함수 )
// Video.find({}, (error, videos) => {}); 
export const home = async(req, res) => {   
    try{
        const videos = await Video.find({});
        // db를 받을 때까지 await이 JS를 기다려줌
        return res.render("home", {pageTitle : "Home", videos});
    } catch(error){
        return res.render("server-error");
    }
};
// render(name of view, variable)
export const watch = (req, res) => {
    const id = req.params.id;    //const {id} = req.params;    
    
     return res.render("watch", {pageTitle: `Watch`, });
};
export const getEdit = (req, res) => {
    const {id} = req.params;        
    return res.render("edit", {pageTitle:`Editing `});
} ;
export const postEdit = (req, res) =>{
    const {id} = req.params; 
    const title = req.body.title;     //const {title} = req.body    
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
            hashtags:hashtags.split(",").map(word => `#${word}`),
            // "String".split(",") => ,를 기점으로 배열에 String을 분리
            // array.map(word => `#${word}`) => 각 배열 인자마다 앞에 #을 달아줌            
        }); 
        return res.redirect("/");
    } catch(error){
        return res.render("upload", {pageTitle : "Upload Video", errorMessage: error._message}); 
    }
};