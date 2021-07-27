import User from "../models/User";
import bcrypt from "bcrypt";

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
    try{
        await User.create({
            name, username, email, password, location
        });
        return res.redirect('/login');        
    } catch(error){
        return res.status(400).render("/join", {pagetitle:"Join", errorMessage:error._message});
    };
} 

export const getLogin = (req, res) => res.render("login", {pageTitle:"Login"});
export const postLogin = async (req, res) => {
    const { username, password} = req.body;
    const user = await User.findOne({username});

    //check if account exists
    if(!user){
        return res.status(400).render("login", {pageTitle:"Login", errorMessage:"Username does not exists"});
    }
    //check if password correct
    const ok = await bcrypt.compare(password, user.password); 
    //return true or false
    if(!ok){
        return res.status(400).render("login", {pageTitle:"Login", errorMessage:"Password is wrong."});
    }
    
    //session에 user 저장하기
    req.session.loggedIn = true;
    req.session.user = user;
    return res.redirect("/");
};

export const edit = (req, res) => res.send("Edit User");
export const remove = (req, res) => res.send("Remove User");
export const logout = (req, res) => res.send("Logout");
export const see = (req, res) => res.send("See User");