const db = require('../../db/connection')
 const Sequelize = db.Sequelize
 const sequelize = db.sequelize


 const User = sequelize.define("userstable",{
phoneNumber:{
    type:Sequelize.INTEGER,
    allowNull:false,
    unique:true
},
username:{
    type:Sequelize.TEXT,
    allowNull:false,
    unique:true
},
Email:{
    type:Sequelize.TEXT,
    allowNull:false,
    unique:true
},
Password:{
    type:Sequelize.TEXT, 
    allowNull:false
}})
sequelize.sync()

module.exports = User 