var admin = require("firebase-admin");

module.exports = (req,res,next) => {
    
        console.log(req.headers.authorization)
        const idToken = req.headers.authorization;
        admin.auth().verifyIdToken(idToken).then(decodedToken => {
            next();
        }).catch(error => res.status(403).send("Unauthorized access"));
    }
    
