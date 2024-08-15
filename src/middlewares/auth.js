const { getUser } = require('../services/auth');

function checkForAuthentication(req, res, next){
    const userUid = req.cookies.uid;
    const user = getUser(userUid);
    req.user = user;
    return next()
}


function restrictTo(roles){
    return function(req,res,next){
        console.log(req)
        if(!req.user) return res.redirect('/login');
        if(!roles.includes(req.user.role)) return res.end('unAuthorized');            
        return next()
    }
}

module.exports = {
    restrictTo,
    checkForAuthentication
}