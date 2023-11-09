const express = require("express")
const app = express()
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.port
const cors = require('cors')
app.use(express.json())
app.use(cors())
const db = require('./backend/db/connection')
db.sequelize.sync()
.then(()=>{
    console.log("connected to db")
})
.catch((error)=>{
    console.log(error)
})    






try {
    app.use(require('./backend/routes/admin/adminroute')) 
    
} catch (error) {
console.log(error)
}

 


try {
    app.use(require('./backend/routes/lenovo laptops/lenovoroutes')) 
    
} catch (error) {
console.log(error)
}


try {
    app.use(require('./backend/routes/apple route/appleroute')) 
    
} catch (error) {
console.log(error)
}




try {
    app.use(require('./backend/routes/hp route/hp')) 
    
} catch (error) {
console.log(error)
}





try {
    app.use(require('./backend/routes/usersroute/usersroute')) 
    
} catch (error) {
console.log(error)
}






try {
    app.use(require('./backend/routes/laptopsroute/lappy'))
    
} catch (error) {
console.log(error)
}


app.listen(PORT,()=>{
    console.log(`app listening at ${PORT}`)
})