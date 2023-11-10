import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookie from "js-cookie";

import { Link } from "react-router-dom";
import Preloader from "../../../preloader";
function Insertlaptop() {
  var navigate = useNavigate()
  const [price, setPrice] = useState("");
  const [laptopImageone, setLaptopimageone] = useState("");
  const [laptopImagetwo, setLaptopimagetwo] = useState("");
  const [feRoute, setFeroute] = useState("");
  const [nameoflaptop, setNameoflaptop] = useState("");
  const [condition, setCondition] = useState("");
  const [scsmsg, setScsmsg] = useState("");
  const [laptopImagethree, setLaptopimagethree] = useState("");
  const [availability, setAvailability] = useState("");
  const [brand,setBrand] = useState("")
  const [cpuprocessor,setCpuprocessor] = useState("")
  const [Graphicsprocessor,setGraphicprocessor] = useState("")
  const [HardDriveType,setHarddrivetype] = useState("")
  const [memorytechnology,setMemorytechnology] = useState("")
  const [ram,setRam] = useState("")
  const [display,setDisplay] = useState("")
  const [storagecapacity,setStorageCapacity] = useState("")
  const [loading, setLoading] = useState(false);
 

 

  async function postlaptop(e) {
    setLoading(true);
    e.preventDefault();
    const token = Cookie.get("admin cookie")
    try {
      const response = await axios.post("http://localhost:7000/insert/laptop", {
        Price:price,
        laptopImageone:laptopImageone,
        laptopImagetwo:laptopImagetwo,
        laptopImagethree:laptopImagethree,
        condition:condition,
        feRoute:feRoute,
        availability:availability,
        brand:brand,
        nameoflaptop:nameoflaptop,
        cpuprocessor:cpuprocessor,
        Graphicsprocessor:Graphicsprocessor,
        HardDriveType:HardDriveType,
        MemoryTechnology:memorytechnology,
        RAMSize:ram,
        Display:display,
        StorageCapacity:storagecapacity


      },
      {
        headers:{Authorization:token}
      }
      
      );
      if (response.data.message === "Laptop inserted successfully") {
        setLoading(false)
      setScsmsg("laptop insertion sucess")
        
      } 
      else if(response.data.message==="Unauthorized no token"){
        setTimeout(()=>{
            navigate("/")
        },3000)
        }
    } catch (error) {
        setLoading(false)
        setScsmsg("An error occured while posting")
      console.log(error);
    }
  }

  return (
    <div className="container">
      <div className="reg">
        <div className="intro">
          <img
            src="https://res.cloudinary.com/dasrniwpk/image/upload/v1699294841/LogoSample_ByTailorBrands_2_dbv399.png"
            alt=""
          />
        </div>
        <strong>Add laptop</strong>

        {loading ? (
          <Preloader />
        ) : (
          <form onSubmit={postlaptop}>
            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter laptop price"
            onChange={(e)=>setPrice(e.target.value)}
            ></textarea>
            </div>




       
         
            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter name of laptop"
            onChange={(e)=>setNameoflaptop(e.target.value)}
            ></textarea>
            </div>










            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter image one of laptop"
            onChange={(e)=>setLaptopimageone(e.target.value)}
            ></textarea>
            </div>







            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter image two of laptop"
            onChange={(e)=>setLaptopimagetwo(e.target.value)}
            ></textarea>
            </div>
        





            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter image three of laptop"
            onChange={(e)=>setLaptopimagethree(e.target.value)}
            ></textarea>
            </div>

          
          







            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter cpu processor"
            onChange={(e)=>setCpuprocessor(e.target.value)}
            ></textarea>
            </div>


             




            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter condition of laptop"
            onChange={(e)=>setCondition(e.target.value)}
            ></textarea>
            </div>






            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter availability "
            onChange={(e)=>setAvailability(e.target.value)}
            ></textarea>
            </div>


        

       

            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter laptop ramSize"
            onChange={(e)=>setRam(e.target.value)}
            ></textarea>
            </div>





            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter laptop display"
            onChange={(e)=>setDisplay(e.target.value)}
            ></textarea>
            </div>
            




            <div className="reginfo">
            <textarea 
            required
            placeholder="enter laptop route"
            onChange={(e)=>setFeroute(e.target.value)}
            ></textarea>
            </div>

   


            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter laptop brand"
            onChange={(e)=>setBrand(e.target.value)}
            ></textarea>
            </div>




            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter laptop graphic processor"
            onChange={(e)=>setGraphicprocessor(e.target.value)}
            ></textarea>
            </div>



            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter laptop harddrive type"
            onChange={(e)=>setHarddrivetype(e.target.value)}
            ></textarea>
            </div>





            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter laptop memory technology"
            onChange={(e)=>setMemorytechnology(e.target.value)}
            ></textarea>
            </div>




            <div className="reginfo">
            <textarea 
            required
            placeholder="Enter laptop storage capacity"
            onChange={(e)=>setStorageCapacity(e.target.value)}
            ></textarea>
            </div>




            <button>Add laptop</button>
            <p className="msg">{scsmsg}</p>
          
            <Link to="/login/client" className="link">
              <stron>Already have an account?</stron>
            </Link>
          </form>
        )}
      </div>
    </div>
  );
}
export default Insertlaptop
