const jwt = require("jsonwebtoken")
require("dotenv").config();

// function authmiddleware(req, res, next)
// {
//    const authHeader = req.headers.authorization

//    if(!authHeader || !authorization.startsWith('Bearer'))
//    {
//        res.status(404).json({})
//    }

//    const token = authHeader.split('')[1]


//    try{
//       const decoded = jwt.verify(token, process.env.JWT_SECRET);

//       if(decoded.userId)
//       {
//         req.userId = decoded.userId
//         next()
//       }
//       else{
//         res.status(403).json({})
//       }
    
//    }
//    catch(error)
//    {
//     res.status(401).json({})
//    }

// }

// module.exports = {
//     authmiddleware
// }


function authmiddleware(req, res, next) {
    const authHeader = req.headers.authorization;
    console.log("Authorization Header:", authHeader);


    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(404).json({ message: "Authorization header not found or malformed" });
    }

    const token = authHeader.split(' ')[1];

    if (!token) {
        return res.status(404).json({ message: "Token not found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.userId) {
            req.userId = decoded.userId;
            next();
        } else {
            return res.status(403).json({ message: "Forbidden: Invalid token data" });
        }
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }
}

module.exports = {
    authmiddleware
};

