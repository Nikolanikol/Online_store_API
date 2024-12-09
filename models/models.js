const sequelize = require('../db.js')
const {DataTypes} = require('sequelize')

const User = sequelize.define('user' , {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    email : {type : DataTypes.STRING, unique : true},
    password : {type : DataTypes.STRING},
    role : {type : DataTypes.STRING, defaultValue : "USER"}
}, {
  freezeTableName: true // Имя таблицы будет таким же, как и имя модели
})
const Basket = sequelize.define('basket' , {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
}, {
  freezeTableName: true // Имя таблицы будет таким же, как и имя модели
})

const BasketDevice = sequelize.define('basket_device' , {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
}, {
  freezeTableName: true // Имя таблицы будет таким же, как и имя модели
})

const Device = sequelize.define('device', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    name : {type : DataTypes.STRING, unique : true, allowNull : false},
    price : {type : DataTypes.INTEGER, allowNull  : false},
    rating : {type : DataTypes.INTEGER, defaultValue : 0},
    img : {type : DataTypes.STRING, allowNull : false}
}, {
  freezeTableName: true // Имя таблицы будет таким же, как и имя модели
})

const Type = sequelize.define('type', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    name : {type : DataTypes.STRING, unique : true, allowNull : false}
}, {
  freezeTableName: true // Имя таблицы будет таким же, как и имя модели
})

const Brand = sequelize.define('brand', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    name : {type : DataTypes.STRING, unique : true, allowNull : false}
}, {
  freezeTableName: true // Имя таблицы будет таким же, как и имя модели
})

const Rating = sequelize.define('rating', {
    id :{type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    rate : {type : DataTypes.INTEGER, allowNull : false}
}, {
  freezeTableName: true // Имя таблицы будет таким же, как и имя модели
})

const DeviceInfo = sequelize.define('device_info', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true},
    title : {type : DataTypes.STRING, allowNull : false},
    description : {type : DataTypes.STRING, allowNull : false}
}, {
  freezeTableName: true // Имя таблицы будет таким же, как и имя модели
})

const TypeBrand = sequelize.define('type_brand', {
    id : {type : DataTypes.INTEGER, primaryKey : true, autoIncrement : true}
}, {
  freezeTableName: true // Имя таблицы будет таким же, как и имя модели
})
User.hasOne(Basket)
Basket.belongsTo(User)

User.hasMany(Rating)
Rating.belongsTo(User)

Basket.hasMany(BasketDevice)
BasketDevice.belongsTo(Basket)

Type.hasMany(BasketDevice)
BasketDevice.belongsTo(Type)


Type.hasMany(Device)
Device.belongsTo(Type)

Brand.hasMany(Device)
Device.belongsTo(Brand)


Device.hasMany(Rating)
Rating.belongsTo(Device)

Device.hasMany(BasketDevice)
BasketDevice.belongsTo(Device)

Device.hasMany(DeviceInfo, {as : 'info'})
DeviceInfo.belongsTo(Device)

Type.belongsToMany(Brand, {through : TypeBrand})
Brand.belongsToMany(Type, {through : TypeBrand})

module.exports = {
    User,
    Basket,
    BasketDevice,
    Device,
    Type,
    Brand,
    Rating,
    TypeBrand,
    DeviceInfo
}