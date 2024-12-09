require('dotenv').config();
const sequelize = require('./db')
const express = require('express')
const models = require('./models/models')
const PORT = process.env.PORT ||  8000
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleWare')
const fileupload = require('express-fileupload')
const path = require('path')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileupload())
app.use('/api', router)


app.use('/', (req, res)=>{
    res.status(200).json({message : 'hello'})
})






app.use(errorHandler)
const start = async ()=>{
    try{

        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT, ()=>console.log(`Server started on ${PORT}`))

    }catch(e){
        console.log(e)
    }
}
start()