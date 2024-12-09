const jsonwebtoken = require('jsonwebtoken')


module.exports = function(req,res, next){
    if(res.method=== "OPTIONS"){
        next()
    }


    try {
        const token = req.headers.authorization.split(' ')[1] // Bearer
        if(!token){
            return res.status(401).json({message : "not authorized"})
        }
        const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY)
        req.user = decoded
        next()
    } catch (error) {
        res.status(401).json({message : "not authorized"})
    }
}