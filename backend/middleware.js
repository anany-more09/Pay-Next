const jwt = require("jsonwebtoken")
require("dotenv").config();

function authmiddleware(req, res, next)
{
   const authHeader = req.headers.authorization

   if(!authHeader || !authorization.startsWith('Bearer'))
   {
       res.status(404).json({})
   }

   const token = authHeader.split('')[1]


   try{
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if(decoded.userId)
      {
        req.userId = decoded.userId
        next()
      }
      else{
        res.status(403).json({})
      }
    
   }
   catch(error)
   {
    res.status.json({})
   }

}

module.exports = {
    authmiddleware
}








