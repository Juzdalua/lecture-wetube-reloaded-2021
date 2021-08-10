import multer  from "multer";

export const localsMiddleware = (req, res, next) =>{    
    res.locals.loggedIn = Boolean(req.session.loggedIn);
    res.locals.siteName = "Wetube";
    res.locals.loggedInUser = req.session.user || {};
    next();
};

// 비로그인 유저 방지
export const protectorMiddleware = (req, res, next)=> {
    // if(req.session.loggedIn){
    //     return next();
    // } else{
    //     return res.redirect("/login");
    // }
    return req.session.loggedIn === true ? next() : res.redirect("/login");
};

// 로그인 유저 방지
export const publicOnlyMiddleware = (req, res, next) => {
    if(!req.session.loggedIn){
        return next();
    } else{
        res.redirect("/");
    }
    // return req.session.loggedIn === false ? next() : res.redirect("/");
};

export const avatarUpload = multer({
    //파일을 어디에 저장할지 정하기.
    //ex) hdd로 설정
    dest:"uploads/avatars/",
    limits: {
        fileSize: 30000000,
    }
});

export const videoUpload = multer({
    dest:"uploads/videos/",
    limits: {
        fileSize:10000000,
    }
});