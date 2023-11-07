import React from "react";
import { useEffect,useState } from "react";
import axios from "axios";
import {FcSearch} from "react-icons/fc"
import {VscThreeBars} from "react-icons/vsc"


function Navigationmenu(){
const [alllaptopsdata,setAlllaptopsdate] = useState([])
const [searchTerm,setSearchterm] = useState('')
const [filteredData,setFiltereddata] = useState([])
const [noresults,setNoresults] = useState('')
const [lowerlimitPricerange,setLowerlimitpricerange] = useState('')
const [higherlimitpricerange,setHigherlimitprice] = useState('')
const [laptopsDataonprices,setLaptopdateonprices] = useState([])
const [noofHPlaptops,setNoofhplaptops] = useState([])
const [alllaptopscounted,setAlllaptopscounted] = useState([])
const  [isVisible,setIsvisible] = useState(false)
const  [Noofapplelaptops,setNoofapplelaptops] = useState([])
useEffect(()=>{
    async function fetchAllLaptops(){
        try {
        const response = await axios.get('http://localhost:7000/get/alllaptops')
        if(response.data.message==="all laptops"){
        setAlllaptopsdate(response.data.data)
        console.log("setlaptops",alllaptopsdata)
        }
        else if(response.data.error==="No laptops"){
        setAlllaptopsdate(null)
        }
            
        } catch (error) {
         console.log(error)   
        }
        }
        fetchAllLaptops()
        
},[])






async function fetchLaptoponterm(){
try {
const response  = await axios.get('http://localhost:7000/filter/all',{
    params:{keySearchterm:searchTerm}
})



if(response.data.message==="Laptops found"){
setFiltereddata(response.data.data)
}
else if(response.data.message==="No results based on your search"){
setNoresults("No results found based on your search")

}
    
} catch (error) {
    setNoresults("internal server error")
    console.log(error)
}
}











async function filterLaptopsonpricerange(){
try {
const response = await axios.get("http://localhost:7000/filter/pricewise",{
    params:{
     higherlimit:higherlimitpricerange,
     lowerlimit:lowerlimitPricerange 

    }
})



if(response.data.message==="No results based on your search"){
setNoresults("No laptops found based on your prices")
}
else if(response.data.message==="laptops found"){
setLaptopdateonprices(response.data.data)
}   
} catch (error) {
   console.log(error) 
}
}






useEffect(()=>{
    async function Numberofhplaptops(){
        try {
            const response = await axios.get("http://localhost:7000/count/hp")
        if(response.data.message==="hp laptops counted"){
        setNoofhplaptops(response.data.data)
        }    
        } catch (error) {
            console.log(error)
         }}
         Numberofhplaptops()
},[])




useEffect(()=>{
    async function Totalnooflaptops(){
        try {
            const response = await axios.get("http://localhost:7000/count/alllaptops")
        if(response.data.message==="laptops counted"){
        setAlllaptopscounted(response.data.data)
        }    
        } catch (error) {
            console.log(error)
         }}
         Totalnooflaptops()
},[])















//functin toogle nav
function toggleCategories(){
    setIsvisible(!isVisible)
}




useEffect(()=>{
    async function Numberofapplelaptops(){
        try {
            const response = await axios.get("http://localhost:7000/count/apple")
        if(response.data.message==="apple laptops counted"){
        setNoofapplelaptops(response.data.data)
        }    
        } catch (error) {
            console.log(error)
         }}
         Numberofapplelaptops()
},[])


















return(
<div className="nav">
<div className="intro">
<img src="https://res.cloudinary.com/dasrniwpk/image/upload/v1699294841/LogoSample_ByTailorBrands_2_dbv399.png" alt="" />


</div>
    <div className="categories">
        
        <i onClick={toggleCategories}><VscThreeBars/></i>
    <ul style={{display: isVisible ? 'block' : 'none' }}>
    <li>
            All Laptops ({alllaptopscounted})
        </li>
        <li>
            HP Laptops ({noofHPlaptops})
        </li>

        <li>
            Apple Laptops ({Noofapplelaptops})
        </li>
    </ul>



    </div>



{/* //filter on key search term */}

<div className="searchitem">

<div>
<input type="text"
required
placeholder="SEARCH PRODUCT"
onChange={(e)=>setSearchterm(e.target.value)}
/>
<FcSearch onClick={fetchLaptoponterm} className="search-icon"/>
<p>{noresults}</p>
</div>
{filteredData.map((item)=>(
    <div className="alllaptopsdata">
<div className="laptops-card">
<strong><strong>{item.nameoflaptop}</strong></strong>
<p>Brand:<strong>{item.brand}</strong></p>
<img src={item.laptopImageone} alt="" />
<p>cpuprocessor:<span>{item.cpuprocessor}</span></p>
<p>Condition:<span>{item.condition}</span></p>
<p>RAM Size:<span>{item.RAMSize}</span></p>
<p>Graphic processor:<span>{item.Graphicsprocessor}</span></p>
<p>Storage Capacity:<span>{item.StorageCapacity}</span></p>
<p>Hard Drive Type:<span>{item.HardDriveType}</span></p>
<p>Availability:<span>{item.availability}</span></p>
<h1>Price:<strong> KSH {item.Price}</strong></h1>
</div>
</div>




))}

</div>






{/* filter laptops on price range */}
<div className="filterpricewise">
<strong>Filter laptops pricewise</strong>
<div className="limits">
 
<input type="number" placeholder="Enter lower price eg 0" onChange={(e)=>setLowerlimitpricerange(e.target.value)} />  to <input type="number" placeholder="Enter higher price eg 1000000" onChange={(e)=>setHigherlimitprice(e.target.value)} />
<i><FcSearch onClick={filterLaptopsonpricerange}/></i>

<p>{noresults}</p>
</div>


{laptopsDataonprices.map((item)=>(

<div className="laptops-container">
<div className="laptops-card">
<strong><span>{item.nameoflaptop}</span></strong>
<p>Brand:<span>{item.brand}</span></p>
<img src={item.laptopImageone} alt="" />
<p>cpuprocessor:<span>{item.cpuprocessor}</span></p>
<p>Condition:<span>{item.condition}</span></p>
<p>RAM Size:<span>{item.RAMSize}</span></p>
<p>Graphic processor:<span>{item.Graphicsprocessor}</span></p>
<p>Storage Capacity:<span>{item.StorageCapacity}</span></p>
<p>Hard Drive Type:<span>{item.HardDriveType}</span></p>
<p>Availability:<span>{item.availability}</span></p>
<h1>Price:<span> KSH {item.Price}</span></h1>
</div>
</div>


))}




</div>























{alllaptopsdata.map((item)=>(
<div className="alllaptopsdata">
<div className="laptops-card">
<strong><strong>{item.nameoflaptop}</strong></strong>
<p>Brand:<strong>{item.brand}</strong></p>
<img src={item.laptopImageone} alt="" />
<p>cpuprocessor:<span>{item.cpuprocessor}</span></p>
<p>Condition:<span>{item.condition}</span></p>
<p>RAM Size:<span>{item.RAMSize}</span></p>
<p>Graphic processor:<span>{item.Graphicsprocessor}</span></p>
<p>Storage Capacity:<span>{item.StorageCapacity}</span></p>
<p>Hard Drive Type:<span>{item.HardDriveType}</span></p>
<p>Availability:<span>{item.availability}</span></p>
<h1>Price:<strong> KSH {item.Price}.00</strong></h1>
</div>
</div>
))}



</div>





)





}









export default Navigationmenu