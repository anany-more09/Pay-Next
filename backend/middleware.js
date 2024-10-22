const jwt = require("jsonwebtoken")
const {JWT_SECRETE} = require("./config")

function authmiddleware(req, res, next)
{
   const authHeader = req.headers.authorization

   if(!authHeader || !authorization.startsWith('Bearer'))
   {
       res.status(404).json({})
   }

   const token = authHeader.slit('')[1]


   try{
      const decoded = jwt.verify(token, JWT_SECRETE);

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