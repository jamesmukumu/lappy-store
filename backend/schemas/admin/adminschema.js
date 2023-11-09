const db = require("../../db/connection")
const Sequelize = db.Sequelize
const sequelize = db.sequelize



const Admin = sequelize.define("Adminstable",{
firstname:{
    type:Sequelize.STRING,
    allowNull:false
},
secondname:{
    type:Sequelize.STRING,
    allowNull:false
},
Email:{
    allowNull:false,
    unique:true,
    type:Sequelize.TEXT
},
password:{
    allowNull:false,
    type:Sequelize.TEXT
},
recoveryOTP:{
    allowNull:true,
    unique:true,
    type:Sequelize.TEXT
},
companysPassphrase:{
    type:Sequelize.STRING,
    defaultValue:"PJ 2022",
    allowNull:false
}




})

sequelize.define()

module.exports = Admin