const db = require("../../db/connection")
const sequelize = db.sequelize
const Sequelize = db.Sequelize


const laptop = sequelize.define("laptopstable",{
Price:{
    type:Sequelize.INTEGER,
    allowNull:false

},
laptopImageone:{
type:Sequelize.TEXT,
allowNull:true
},
laptopImagetwo:{
    type:Sequelize.TEXT,
    allowNull:true
    },
    laptopImagethree:{
        type:Sequelize.TEXT,
        allowNull:true
        },
availability:{
    type:Sequelize.STRING,
    allowNull:false
},
brand:{
    type:Sequelize.STRING,
    allowNull:false
},
cpuprocessor:{
    type:Sequelize.STRING,
    allowNull:false
},
Graphicsprocessor:{
    type:Sequelize.STRING,
    allowNull:false
},

HardDriveType:{
    type:Sequelize.STRING,
    allowNull:false
},
MemoryTechnology:{
    type:Sequelize.TEXT,
    allowNull:false
},

RAMSize:{
    type:Sequelize.TEXT,
    allowNull:false
},
Display:{
   type:Sequelize.TEXT,
   allowNull:false
},
StorageCapacity:{
    type:Sequelize.TEXT,
    allowNull:false
},
condition:{
    type:Sequelize.STRING,
    allowNull:false
},
nameoflaptop:{
    type:Sequelize.TEXT,
    allowNull:true, 
    unique:true
},
feRoute:{
type:Sequelize.STRING,
allowNull:false,
unique:true

}
})

sequelize.sync()
module.exports = laptop  