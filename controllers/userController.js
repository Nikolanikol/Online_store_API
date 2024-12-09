const ApiError = require('../error/ApiError')
const bcrypt = require('bcrypt')
const jsonwebtoken = require('jsonwebtoken')
const {User, Basket} = require('../models/models')
const { use } = require('../routes')

const generateJwt = (id, email, role)=>{
    return  jsonwebtoken.sign(
        {id : id, email, role}, 
        process.env.SECRET_KEY, 
        {expiresIn : '24h'}
    )
}

class UserController{
    async registration(req, res, next){
        const {email, password, role } = req.body
        if(!email || !password){
            return next(ApiError.badRequest('uncorrect email or password'))
        }
        const candidate = await User.findOne({where : {email}})
        if(candidate){
            return next(ApiError.badRequest('we also have user with this email'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password : hashPassword})
        const basket = await Basket.create({userId : user.id})
        const jwt = generateJwt(user.id, user.email, user.role)
        return res.json({jwt})
    }
    async login(req, res, next){
        console.log('USER IS')
        const {email, password} = req.body
        const user = await User.findOne({where: {email}})
        if(!user){

            return next(ApiError.badRequest('we have not this user'))
        }
        console.log('user is')
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('uncorrect password'))

        }
        const token = generateJwt(user.id, user.email, user.role)
        return res.json({token})
    }
    async check(req, res, next){
        const token = generateJwt(req.id, req.email, req.role)
        return res.json(token)
    }
}

module.exports = new UserController()