import User from "../models/User";
import bcrypt from "bcrypt";
import fetch from "node-fetch";

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
    const user = await User.findOne({ username, socialOnly:false });

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

//Github Login
export const startGithubLogin = (req, res) => {        
    const baseUrl = `https://github.com/login/oauth/authorize`;
    const config = { 
        client_id: process.env.GH_CLIENT,
        scope: "read:user user:email"
    };
    //object를 URL로 매칭.
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    return res.redirect(finalUrl);
};

export const finishGithubLogin = async (req, res) => {
    const baseUrl = `https://github.com/login/oauth/access_token`;
    const config = {
        client_id: process.env.GH_CLIENT,
        client_secret: process.env.GH_SECRET,
        code: req.query.code
        //code는 url parameter로 받음. github이 제공.
    };
    const params = new URLSearchParams(config).toString();
    const finalUrl = `${baseUrl}?${params}`;
    
    //post request
    const tokenRequest = await (await fetch(finalUrl, {
        method: "POST",
        headers:{
            Accept: "application/json"
        }
    })).json();    
    if("access_token" in tokenRequest){
        //access api - user infomation 가져오기
        const {access_token} = tokenRequest;
        const apiUrl = "https://api.github.com";
        const userData = await (await fetch(`${apiUrl}/user`, {
            headers: {
                Authorization: `token ${access_token}`
            }
        })).json();
        
        // email 가져오기 - primary/verified: true
        const emailData = await (
            await fetch(`${apiUrl}/user/emails`, {
                headers:{
                    Authorization: `token ${access_token}`
                }
            }
        )).json();
        const emailObj = emailData.find(
            email => email.primary === true && email.verified === true);
        if(!emailObj){
            return res.redirect("/login");    
        }
        
        //github와 email이 같으면 로그인시켜주기
        let user = await User.findOne({email: emailObj.email});
        if(!user){
            //create an account
           user = await User.create({
                name: userData.name,
                username: userData.login,
                email: emailObj.email,
                password: "",
                location: userData.location,
                socialOnly: true,
                avatarUrl: userData.avatar_url
            });
        }                    
        //login
        req.session.loggedIn = true;
        req.session.user = user;
        return res.redirect("/");
        
    } else{
        return res.redirect("/login");
    }
};

export const logout = (req, res) => {
    req.session.destroy();
    return res.redirect("/");
};

//edit user
export const getEdit = (req, res) => {
    return res.render("edit-profile", {pageTitle:"Edit Profile"});
};
export const postEdit = (req, res) => {
    return res.render("edit-profile", {pageTitle:"Edit Profile"});
};


export const see = (req, res) => res.send("See User");