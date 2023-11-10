const laptop = require("../../schemas/laptops/laptop")
const Sequelize = require("sequelize")

//insert laptop    
 

async function insetLaptopDb(req,res){
try {
const {Price,laptopImageone,laptopImagetwo, feRoute,nameoflaptop,condition,laptopImagethree,availability,brand,cpuprocessor,Graphicsprocessor,HardDriveType,MemoryTechnology,RAMSize,Display,StorageCapacity}= req.body
const insertedLappy = new laptop( {Price,laptopImageone,laptopImagetwo, feRoute,nameoflaptop,condition,laptopImagethree,availability,brand,cpuprocessor,Graphicsprocessor,HardDriveType,MemoryTechnology,RAMSize,Display,StorageCapacity})
const results = await insertedLappy.save()  
return res.status(200).json({message:"Laptop inserted successfully"})
} catch (error) {
 return res.status(500).json({error:` the error is ${error}`})   
} 

  

} 

 
// get all the laptops in the db

async function getAlllaptops(req,res){
try {
    const alllaptops = await laptop.findAll()
 if(!alllaptops){
return res.status(200).json({error:"No laptops"})
 }    


 else{
    return res.status(200).json({message:"all laptops",data:alllaptops})
 }
} catch (error) {
    return res.status(500).json({error})
}
}




//get a laptop based on key word

async function filterLaptopsonkeyterm(req,res){
try {
const keySearchterm = req.query.keySearchterm
const results = await laptop.findAll({where:{[Sequelize.Op.or]:[
{
    brand:{
        [Sequelize.Op.iLike]:`%${keySearchterm}%`
    }
},
{
    cpuprocessor:{
        [Sequelize.Op.iLike]:`%${keySearchterm}%`
    },
    
},
{
    RAMSize:{
        [Sequelize.Op.iLike]:`%${keySearchterm}%`
    }
},
{
    StorageCapacity:{
        [Sequelize.Op.iLike]:`%${keySearchterm}%`
    },
    nameoflaptop:{
        [Sequelize.Op.iLike]:`%${keySearchterm}%`
    }
},
{
    HardDriveType:{
        [Sequelize.Op.iLike]:`%${keySearchterm}%`
    },
    
}]}})

if(results.length===0){
return res.status(200).json({message:"No results based on your search"})
}
else if (results){
return res.status(200).json({message:"Laptops found",data:results})
}
    
} catch (error) {
   return res.status(500).json({error:`${error}`}) 
}
}







//filter basing on price range
async function filterPricewise(req,res){
try {
const higherlimit = req.query.higherlimit
const lowerlimit = req.query.lowerlimit
const resultsBasedonprice = await laptop.findAll({where:{
    Price:{
    [Sequelize.Op.gte]:lowerlimit,
   
    [Sequelize.Op.lte]:higherlimit
    }
}})


if(resultsBasedonprice.length===0){
return res.status(200).json({message:"No results based on your search"})
}
else{
    return res.status(200).json({message:"laptops found",data:resultsBasedonprice})
}
    
} catch (error) {
 return res.status(500).json({error:`${error}`})   
}}



//filter hp laptops


async function filterHP(req,res){
try {
    const filterAllHp = await laptop.findAll({where:{brand:{[Sequelize.Op.iLike]:'%hp%'}}})
    if(filterAllHp.length===0){
    return res.status(200).json({message:'No hp laptops'})
    }
    else{
        return res.status(200).json({message:"hp laptops found",data:filterAllHp})
    }
} catch (error) {
return res.status(500).json({error:`${error}`})    
}}



//filter all lenovo laptops
async function filterLenovo(req,res){
    try {
        const filterAlllenovo = await laptop.findAll({where:{brand:{[Sequelize.Op.iLike]:'%lenovo%'}}})
        if(filterAlllenovo.length===0){
        return res.status(200).json({message:'No lenovo laptops'})
        }
        else{
            return res.status(200).json({message:"Lenovo laptops fetched",data:filterAlllenovo})
        }
    } catch (error) {
    return res.status(500).json({error:`${error}`})    
    }}


//filter apple laptops
async function filterApple(req,res){
    try {
        const filterAllapple = await laptop.findAll({where:{brand:{[Sequelize.Op.iLike]:'%apple%'}}})
        if(filterAllapple.length===0){
        return res.status(200).json({message:'No apple laptops'})
        }
        else{
            return res.status(200).json({message:"Apple laptops fetched",data:filterAllapple})
        }
    } catch (error) {
    return res.status(500).json({error:`${error}`})    
    }}






    //update availability of alaptop

    async function updateLaptop(req, res) {
        const Nameoflappy = req.query.nameoflaptop;
        try {
          const updatedLaptop = await laptop.update(
            { availability: req.body.availability },
            { where: { nameoflaptop: { [Sequelize.Op.iLike]: `%${Nameoflappy}%` } } }
          );
      
          if (updatedLaptop > 0) {
            return res.status(200).json({ message: "Updated" });
          } else {
            return res.status(200).json({ error: "No laptop updated" });
          }
        } catch (error) {
          console.error(error);
          return res.status(500).json({ error: `${error.message}` });
        }
      }
      



//update price of a laptop
async function updatepriceLaptop(req,res){
const Nameoflappy = req.query.nameoflaptop
try {
const updatedLaptop = await laptop.update({Price:req.body.Price},{where:{nameoflaptop:{[Sequelize.Op.iLike]:`%${Nameoflappy}%`}}})
if(updatedLaptop > 0){
return res.status(200).json({message:"Updated"})
}
else {
return res.status(200).json({error:"no laptop updated"})
}
} catch (error) {
return res.status(500).json({error:`${error}`})    
}
}



//count all laptops

async function countAlllaptops(req,res){
try {
var countedlaptops = await laptop.count()
if(countedlaptops===0){
return res.status(200).json({message:"No laptops"})
}
else{
return res.status(200).json({message:"laptops counted",data:countedlaptops})
}
    
} catch (error) {
return res.status(500).json({error:`${error}`})
}}

//

//count all hp laptops

async function countHPlaptops(req,res){
try {
const countedHP = await laptop.count({where:{brand:{[Sequelize.Op.iLike]:'%hp%'}}})
if(countedHP===0){
return res.status(200).json({message:"No hp laptops"})
}
else{
return res.status(200).json({message:"hp laptops counted",data:countedHP})    
}
    
} catch (error) {
return res.status(500).json({error:`${error}`}) 
}
}


//count lenovo laptops

async function countlenovoLaptops(req,res){
    try {
    const countedlenovo = await laptop.count({where:{brand:{[Sequelize.Op.iLike]:'%lenovo%'}}})
    if(countedlenovo===0){
    return res.status(200).json({message:"No hp laptops"})
    }
    else{
    return res.status(200).json({message:"lenovo laptops counted",data:countedlenovo})    
    }
        
    } catch (error) {
    return res.status(500).json({error:`${error}`}) 
    }
    }
    

//count apple
async function countApple(req,res){
    try {
    const countedapple = await laptop.count({where:{brand:{[Sequelize.Op.iLike]:'%apple%'}}})
    if(countedapple===0){
    return res.status(200).json({message:"No hp laptops"})
    }
    else{
    return res.status(200).json({message:"apple laptops counted",data:countedapple})    
    }
        
    } catch (error) {
    return res.status(500).json({error:`${error}`}) 
    }
    }
    


//delete laptop 

async function deleteLaptop(req,res){
const laptoptodelete = req.query.nameoflaptop
try {
const laptopTodelete = await laptop.destroy({where:{nameoflaptop:{[Sequelize.Op.iLike]:`%${laptoptodelete}%`}}})
if(!laptopTodelete){
return res.status(200).json({message:"laptop to be deleted not found"})
}
else{
    return res.status(200).json({message:"Deleted"})
}
} catch (error) {
  return res.status(500).json({error:`${error}`})  
}}












 
module.exports = {insetLaptopDb,getAlllaptops,filterLaptopsonkeyterm,filterPricewise,filterHP,filterLenovo,filterApple,updateLaptop,updatepriceLaptop,countAlllaptops,countHPlaptops,countlenovoLaptops,countApple,deleteLaptop}