import Navbar from './components/Navbar';
import Homegif from './components/Homegif';
import Aprofile from './components/Admin/Aprofile'
import Addbus from './components/Admin/Addbus'
import Viewbuses from './components/Admin/Viewbuses'
import Editbus from './components/Admin/Editbus'
import Viewusers from './components/Admin/Viewusers'

import {
  BrowserRouter as Router,

  Route,Routes
} from "react-router-dom";
import Signup from './components/Signup';
import Login from './components/Login';
import About from './components/About';


import { toast, ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';



// toast.configure();
function App() {
  



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

          <Route exact path="/login" element={<Login/>}>
            
          </Route>
          <Route exact path="/admin/profile" element={<Aprofile />}>

          </Route>

          <Route exact path="/admin/addbus" element={<Addbus />}>

          </Route>
          <Route exact path="/admin/viewbuses" element={<Viewbuses />}>

          </Route>

          <Route exact path="/admin/editbus/:id" element={<Editbus />}>

          </Route>
          <Route exact path="/admin/viewusers" element={<Viewusers />}>

          </Route>


      </Routes>




  
    </Router>
    
    </>
   
  );
}

export default App;
