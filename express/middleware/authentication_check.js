var admin = require("firebase-admin");

module.exports = (req,res,next) => {

    /* use firebase sdk to be able to auth the header that is coming into the api from the frond end*/
        const idToken = req.headers.authorization;
        admin.auth().verifyIdToken(idToken).then(decodedToken => {
            next();
        }).catch(error => res.status(403).send("Unauthorized access"));
    }
    
