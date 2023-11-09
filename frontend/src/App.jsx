import React from "react";
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Lenovolaptops from "./components/categories/lenovo";
 import Navigationmenu from "./components/nav";
import Macbookairgold from "./components/laptops/apple laptops/macbook air gold";
import Registerclient from "./components/users/registration";
import Validaterecoveryemail from "./components/users/recoveryemail";
import Loginclient from "./components/users/login";
import HPlaptops from "./components/categories/hp";
import Resetpassword from "./components/users/resetpass";
import Macbookprom2 from "./components/laptops/apple laptops/macbook pro m2";
import Applelaptops from "./components/categories/apple";
import HpelitebookG2 from "./components/laptops/hp laptops/hpelitebookG2";
import Lenovoideapad from "./components/laptops/lenovo laptops/lenovoideapad";
import Pagenotfound from "./404";
function App(){
  return(
    <div>
     <BrowserRouter>
     <Routes>
     <Route path="*" element={<Pagenotfound/>}/>
     <Route path="/lenovo/laptops" element={<Lenovolaptops/>}/>
     <Route path="/" element={<Navigationmenu/>}/> 
     <Route path="/apple/laptops" element={<Applelaptops/>}/>
      <Route path="/apple/mac book/pro/m2/2022" element={<Macbookprom2/>}/>
      <Route path="/hp/elite book 840 G2" element={<HpelitebookG2/>}/>  
      <Route path="/hp/laptops" element={<HPlaptops/>}/>  
      <Route path="apple/mac book" element={<Macbookairgold/>}/> 
      <Route path="/register/client" element={<Registerclient/>}/>  
      <Route path="/login/client" element={<Loginclient/>}/> 
      <Route path="/validate/recovery/email" element={<Validaterecoveryemail/>}/>  
      <Route path="/reset/password" element={<Resetpassword/>}/>   
      <Route path="/lenovo/IDEAPAD S145-15IIL 10TH GEN" element={<Lenovoideapad/>}/>  
     </Routes>
     
     </BrowserRouter>
    </div>
  )
}
export default App