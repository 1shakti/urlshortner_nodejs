const fs = require('fs');

function logReqRes(filename){
    return function(req, res, next){
        fs.appendFile(filename,`\n${Date.now()} ${req.ip} ${req.url}`,(err,data) => {
            next();
        })
    }
}

module.exports = {
    logReqRes
}