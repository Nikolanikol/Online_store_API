const { v4: uuidv4 } = require('uuid');
const path = require('path')
const {Device, DeviceInfo} = require('../models/models')
const ApiError = require('../error/ApiError');
const { title } = require('process');

class DeviceController{
    async create(req, res, next){
        try {
            console.log(req.body)
            const {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let fileName = uuidv4() + '.jpg'
            img.mv(path.resolve(__dirname, '..', 'static', fileName) )
    
     

            const device = await Device.create({name, price, brandId, typeId, info, img : fileName})
    

            if(info){
                console.log(info)
                const parsedInfo = await JSON.parse(info)
                console.log(`PARSED INFO ${parsedInfo}`)
                parsedInfo.forEach(i=>
                        DeviceInfo.create({
                        title : i.title,
                        description : i.description,
                        deviceId : device.id
                    })
                )
            }

            return res.json({message : "ok"})
        } catch (error) {
            next(ApiError.badRequest('mistake from device'))
        }
    }
    async getAll(req, res){
        let {brandId, typeId, limit, page}  = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId){
            devices = await Device.findAndCountAll({limit, offset})
        }

        if(brandId && !typeId){
            devices = await Device.findAndCountAll({where :  {brandId}, limit, offset})

        }

        if(!brandId && typeId){
            devices = await Device.findAndCountAll({where :  {typeId}, limit, offset})

        }
        if(brandId && typeId){
            devices = await Device.findAndCountAll({where : {typeId, brandId}, limit, offset})
        }

        return res.json(devices)
    }
    async getOne(req, res){
        const {id} = req.params
        const device = await Device.findOne(
            {where : {id}, 
            include : [{model : DeviceInfo, as : 'info'}]
        })

        return res.json(device)
    }
}

module.exports = new DeviceController()