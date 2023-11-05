const Sequelize = require("sequelize")
const config = require('./configdb')

const sequelize = new Sequelize(config.DB,config.admin,config.password,{
port:config.port,
host:config.host,
dialect:config.dialect,
operatorAliases:false,
dialectOptions:{
    ssl:{ 
        rejectUnauthorized:false
    }
}, 
pool:{
    max:config.pool.max, 
    min:config.pool.min 
}



})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
module.exports = db