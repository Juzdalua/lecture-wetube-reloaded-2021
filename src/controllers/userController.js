import User from "../models/User";

export const getJoin = (req, res) => res.render("join", {pageTitle:"Join"});
export const postJoin = async (req, res) => {   
    const {name, username, email, password, password2, location} = req.body;

    // password vailidation
    if(password !== password2){
        return res.status(400).render("join", {
            pageTitle:"Join", errorMessage:`Password does not match.`
        });
    }

    // unique username/email validation
    const exists = await User.exists({ $or:[{username:req.body.username}, {email}] });
    if(exists){
        return res.status(400).render("join", {
            pageTitle:"Join", errorMessage:`username/email is already taken.`
        });
    }

    //create user
    await User.create({
        name, username, email, password, location
    });
    return res.redirect('/login');
    };
export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const login = (req, res) => res.send("Login");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");