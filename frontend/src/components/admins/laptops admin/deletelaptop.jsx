import React from "react";
import { useState } from "react";
import Cookie from "js-cookie"
import axios from "axios";
import Preloader from "../../../preloader"
import { useNavigate } from "react-router-dom";

function Deletelaptop(){
var navigate = useNavigate()
const [Nameoflappy,setNameoflappy] = useState("")
const  [deletemsg,setDeletemsg] = useState("")
const [loading,setLoading] = useState(false)




async function deletelaptop(){
    setLoading(true)
try {
const token = Cookie.get("admin cookie")
const response = await axios.delete('http://localhost:7000/delete/laptop',{
    params:{nameoflaptop:Nameoflappy}
},
{
    headers:{Authorization:token}
})


if(response.data.message==="Deleted"){
    setLoading(false)
    setDeletemsg("Laptop deleted")
}
else if(response.data.message==="laptop to be deleted not found"){
    setLoading(false)
setDeletemsg("No laptop found to be deleted")
}
else if(response.data.message==="Unauthorized no token"){
setTimeout(()=>{
    navigate("/")
},3000)
}
  
} catch (error) {
    console.log(error)
}
}



return(
    <div className="container">
      <div className="reg">
        <div className="intro">
          <img
            src="https://res.cloudinary.com/dasrniwpk/image/upload/v1699294841/LogoSample_ByTailorBrands_2_dbv399.png"
            alt=""
          />
        </div>
        <strong>delete laptop </strong>

        {loading ? (
          <Preloader />
        ) : (
          <form onSubmit={deletelaptop}>
            <div className="reginfo">
             <textarea onChange={(e)=>setNameoflappy(e.target.value)} placeholder="Enter laptop name">

             </textarea>
            </div>

           

            <button>Delete</button>
           <p className="msg">{deletemsg}</p>
          </form>
        )}
      </div>
    </div>
)




}
export default Deletelaptop