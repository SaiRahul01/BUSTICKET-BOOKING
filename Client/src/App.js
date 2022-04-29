import Navbar from './components/Navbar';
import Homegif from './components/Homegif';
import Aprofile from './components/Admin/Aprofile'
import Addbus from './components/Admin/Addbus'
import Viewbuses from './components/Admin/Viewbuses'
import Editbus from './components/Admin/Editbus'
import Viewusers from './components/Admin/Viewusers'
import ProtectedRoute from './ProtectedRoute'

import {
  BrowserRouter as Router,

  Route,Routes
} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import AdminLogin from './components/AdminLogin';
import About from './components/About';
import { useState } from 'react';


import { toast, ToastContainer } from 'react-toastify';
import  Axios  from 'axios';
import Userprofile from './components/User/Userprofile';
import Bookticket from './components/User/Bookticket';
import Bookings from './components/User/Bookings';
import Cookies from 'js-cookie';
import Deletebus from './components/Admin/Deletebus';
import Ticketconfirm from './components/User/Ticketconfirm';
import Viewdrivers from './components/Admin/Viewdrivers';
// import 'react-toastify/dist/ReactToastify.css';



// toast.configure();
function App() {
  // Cookies.set("isauth","false")
  
  // const [isauth, setauth] = useState(false)
  // const [authemail, setauthemail] = useState('')

  // const setlogin=()=>{
  //   setauth(true)
  // }
  // const setlogout=()=>{
  //   setauth(false)
  //   setauthemail('')
  // }
  // const setauthmail=(email)=>{
  //   setauthemail(email)
  // }
  
  Axios.defaults.withCredentials=true



  return (
    <>
    
    <Router>
    <Navbar/>


    <Routes>
          <Route exact path="/" element={<Homegif/>}>
              
          </Route>

          <Route exact path="/about" element={<About/>}>
              
          </Route>



          <Route exact path="/signup" element={<Signup/>}>
          
          </Route>

          <Route  exact path="/login"  element={<Login />}>
            
          </Route>
          <Route  exact path="/adminlogin"  element={<AdminLogin />}>

          </Route>

          <Route element = {<ProtectedRoute isLogged={Cookies.get("isauth")}/>} >
            
          <Route exact path="/admin/profile" element={<Aprofile />}>

          </Route>

          <Route exact path="/admin/addbus" element={<Addbus />}>

          </Route>
          <Route exact path="/admin/viewbuses" element={<Viewbuses />}>

          </Route>
          <Route exact path="/admin/viewdrivers" element={<Viewdrivers />}>

          </Route>

          <Route exact path="/admin/editbus/:id" element={<Editbus />}>

          </Route>
          <Route exact path="/admin/deletebus/:id" element={<Deletebus />}>

          </Route>

          <Route exact path="/user/bookticket/:busid/:busname/:fromcity/:tocity/:ticketprice/:seatsleft/:starttime/:reachtime/:tdate" element={<Ticketconfirm />}>

          </Route>





          <Route exact path="/admin/viewusers" element={<Viewusers />}>

          </Route>
          <Route exact path="/user/profile" element={<Userprofile />}>

        </Route>

        <Route exact path="/user/bookticket" element={<Bookticket />}>

        </Route>
        <Route exact path="/user/bookings" element={<Bookings />}>

        </Route>

        </Route>


      </Routes>




  
    </Router>
    
    </>
   
  );
}

export default App;
