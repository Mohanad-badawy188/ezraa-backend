const jwt = require("jsonwebtoken");
const verifyToken = (req, res, next) => {
  const userToken = req.headers.token;
  if (userToken) {
    const token = userToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_SEC , (err, user) => {
      if (err)  res.status(403).json("not valid token !");
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json("not-authenticated !");
  }
};

const verifyTokenAndAuth = (req , res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.id == req.params.id || req.user.isAdmin)
        next();
        else{
            return res.status(403).json("please sign in to continue !");
        }
    })
}
const adminVerifyToken = (req , res,next)=>{
    verifyToken(req,res,()=>{
        if (req.user.isAdmin)
        next();
        else{
            return res.status(403).json(" you are not allowed !");
        }
    })
}
module.exports = {verifyTokenAndAuth,verifyToken,adminVerifyToken }; 