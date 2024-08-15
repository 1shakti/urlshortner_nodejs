const jsw = require("jsonwebtoken");
const private_key = "abchgsdfgsdhg";
// **************statefull authentication ******************||

// const sessionId = new Map();

// function setUser(id,user){
//     sessionId.set(id,user);
// }

// function getUser(id,user){
//     return sessionId.get(id);
// }

// **************stateless authentication using JWT******************||

function setUser(user) {
  return jsw.sign(
    {
      _id: user._id,
      email: user.email,
      role: user.role
    },
    private_key
  );
}

function getUser(token) {
  if (!token) return null;
  try {
    return jsw.verify(token, private_key);
  } catch (e) {
    return null;
  }
}

module.exports = {
  setUser,
  getUser,
};
