const usersModel = require('../models/users');
const { setUser } = require('../services/auth');
const { v4: uuidv4 } = require('uuid');

async function handleSignupUser(req, res) {
    const { name, email, password } = req.body;
    await usersModel.create({
        name,
        email,
        password
    })
    return res.redirect('/login');
}

async function handleLoginUser(req, res) {
    const { email, password } = req.body;
    const user = await usersModel.findOne({email, password});

    if(!user) return res.render('Login',{
        error:'invalid email or password'
    })
    //************************** statefull authenticaation *********************//

    // const sessionId = uuidv4();
    // setUser(sessionId,user);
    // res.cookie('uid',sessionId);
    
    const token = setUser(user);
    res.cookie('uid',token, {
        httpOnly: true, // Prevents JavaScript access
        secure: false, // Only send over HTTPS in production
        sameSite: 'Lax', // Controls cross-site request behavior
        maxAge: 3600000 // Cookie expiration time (e.g., 1 hour)
      });
    return res.redirect('/')
}

module.exports = {
    handleSignupUser,
    handleLoginUser
}
