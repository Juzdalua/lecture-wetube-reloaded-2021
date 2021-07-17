export const trending = (req, res) => {
    const videos = [
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
    return res.render("home", {pageTitle : "Home", videos});
}
// render(name of view, variable)
export const see = (req, res) => res.render("watch");
export const edit = (req, res) => res.render("edit");
export const search = (req, res) => res.send("Search");
export const upload = (req, res) => res.send("Upload Video");
export const deleteVideo = (req, res) => res.send("Delete Video");
