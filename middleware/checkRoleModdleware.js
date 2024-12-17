const jsonwebtoken = require('jsonwebtoken')


module.exports = function(role){
    return function(req,res, next){
        next()
        // if(res.method=== "OPTIONS"){
        //     next()
        // }
    
    
        // try {
        //     const token = req.headers.authorization.split(' ')[1] // Bearer
        //     console.log(req)
        //     console.log(req.headers)
        //     if(!token){
        //         return res.status(401).json({message : "not authorized"})
        //     }
        //     const decoded = jsonwebtoken.verify(token, process.env.SECRET_KEY)
        //     if(decoded.role !== role){
        //         return res.status(403).json({message : "no access"})
        //     }

        //     req.user = decoded
        //     next()
        // } catch (error) {
        //     res.status(401).json({message : "not authorized"})
        // }
    }


}




