let videos = [
    {
    title:"one",
    id:1,
    views:30
    },
    {
    title:"two",
    id:2,
    views:100
    },
    {
    title:"three",
    id:3,
    views:50
    }
];

export const trending = (req, res) => {    
    return res.render("home", {pageTitle : "Home", videos});
}
// render(name of view, variable)
export const watch = (req, res) => {
    const id = req.params.id;    //const {id} = req.params;    
    const video = videos[id-1];
     return res.render("watch", {pageTitle: `Watch ${video.title}`, video});
};
export const getEdit = (req, res) => {
    const {id} = req.params;    
    const video = videos[id-1];
    return res.render("edit", {pageTitle:`Editing :${video.title}`, video});
} ;
export const postEdit = (req, res) =>{
    const {id} = req.params; 
    const title = req.body.title;     //const {title} = req.body
    videos[id-1].title = title;
     return res.redirect(`/videos/${id}`);
};
export const getUpload = (req, res) => {
  return res.render("upload", {pageTitle : "Upload Video"});  
};
export const postUpload = (req, res) => {
    const newVideo = {
        title : req.body.title,
        id : videos.length+1,
        views:0
    };
    videos.push(newVideo);
    return res.redirect("/");
};