const dotenv = require("dotenv")
dotenv.config()

const Host = process.env.host
const Admin = process.env.admin
const Password = process.env.password
const db = process.env.dbname
const portDB = process.env.portdb
module.exports= {
host:Host,
admin:Admin,
password:Password,
DB:db,
dialect:"postgres" ,
pool:{
    max:5,
    min:0
},
port:portDB

}