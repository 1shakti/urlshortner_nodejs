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
    const sessionId = uuidv4();
    setUser(sessionId,user);
    res.cookie('uid',sessionId);
    return res.redirect('/')
}

module.exports = {
    handleSignupUser,
    handleLoginUser
}
