import React from 'react';
import {Link} from "react-router-dom";
import Cookies from 'js-cookie';


export default function Navbar() {

  const handlelogout=()=>{

    Cookies.set("isauth","false");
    if(Cookies.get("role"==="user"))
    {
      
      Cookies.remove("role");
    }
    else
    {
      Cookies.remove("role");
   

    }
    Cookies.remove("user");
    Cookies.remove("admin")
    Cookies.remove("userid")
    
    window.location.href="/";
   
  }


  return (
    
    <>
    <nav className="navbar navbar-expand-lg navbar-fixed-top navbar-dark bg-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">Bus Management</Link >
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

        <li className="nav-item pe-3" style={{display:Cookies.get("isauth")==="false"?'flex':'none',alignItems:'center'}}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24" height="24" fill='white'
        viewBox="0 0 64 64"
        ><path d="M 32 3 L 1 28 L 1.4921875 28.654297 C 2.8591875 30.477297 5.4694688 30.791703 7.2304688 29.345703 L 32 9 L 56.769531 29.345703 C 58.530531 30.791703 61.140812 30.477297 62.507812 28.654297 L 63 28 L 54 20.742188 L 54 8 L 45 8 L 45 13.484375 L 32 3 z M 32 13 L 8 32 L 8 56 L 56 56 L 56 35 L 32 13 z M 26 34 L 38 34 L 38 52 L 26 52 L 26 34 z"></path></svg>
         <Link class="nav-link active" aria-current="page" to="/">Home</Link >
        </li>

        <li className="nav-item pe-3"  style={{display:Cookies.get("isauth")==="false"?'flex':'none',alignItems:'center'}} >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24" height="24"
        viewBox="0 0 48 48"
><path fill="#2196F3" d="M37,40H11l-6,6V12c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,37.3,40.3,40,37,40z"></path><path fill="#FFF" d="M22 20H26V31H22zM24 13A2 2 0 1 0 24 17 2 2 0 1 0 24 13z"></path></svg>
<Link class="nav-link active" aria-current="page" to="/about">About</Link >
        </li>

        <li className="nav-item pe-3" style={{display:Cookies.get("isauth")==="false"?'flex':'none',alignItems:'center'}} >

        <img style={{height:'24px',width:'24px'}} alt='' src="https://img.icons8.com/external-bearicons-outline-color-bearicons/64/000000/external-sign-up-call-to-action-bearicons-outline-color-bearicons-1.png"/>
          <Link className="nav-link active" to="/signup">Sign Up </Link >
        </li>


        <li className="nav-item pe-3" style={{display:Cookies.get("isauth")==="false"?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-key-technology-prettycons-lineal-color-prettycons.png" alt=''/>
          <Link className="nav-link active" to="/login">User Login</Link >
        </li>

        <li className="nav-item pe-3" style={{display:Cookies.get("isauth")==="false"?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-key-technology-prettycons-lineal-color-prettycons.png" alt=''/>
          <Link className="nav-link active" to="/adminlogin">Admin Login</Link >
        </li>
        

        <li className="nav-item pe-3" style={{display:Cookies.get("isauth")==="true" && Cookies.get("user")?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/color/48/000000/test-account.png" alt=''/>
          <Link className="nav-link active" to="/user/profile">Profile</Link >
        </li>

        <li className="nav-item pe-3" style={{display:Cookies.get("isauth")==="true" && Cookies.get("admin")?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/color/48/000000/test-account.png" alt=''/>
          <Link className="nav-link active" to="/admin/profile">Profile</Link >
        </li>
   

        <li className="nav-item pe-3" style={{display:(Cookies.get("isauth")==="true" && Cookies.get("user"))?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/color/48/000000/train-ticket.png" alt=''/>
          <Link className="nav-link active" to="/user/bookticket" >Book Ticket</Link >
        </li>

        <li className="nav-item pe-3" style={{display:(Cookies.get("isauth")==="true" && Cookies.get("admin"))?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/fluency/2x/bus.png" alt=''/>
          <Link className="nav-link active" to="/admin/addbus" >Add Bus</Link >
        </li>
       
        <li className="nav-item pe-3" style={{display:Cookies.get("isauth")==="true" && Cookies.get("user")?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/color/48/000000/ingredients-list.png" alt=''/>
          <Link className="nav-link active" to="/user/bookings" >Bookings</Link >
        </li>

        <li className="nav-item pe-3" style={{display:(Cookies.get("isauth")==="true" && Cookies.get("admin"))?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://cdn-icons-png.flaticon.com/512/1162/1162914.png" alt=''/>
          <Link className="nav-link active" to="/admin/viewbuses" >View Buses</Link >
        </li>

        <li className="nav-item pe-3" style={{display:(Cookies.get("isauth")==="true" && Cookies.get("admin"))?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/external-becris-lineal-color-becris/2x/external-user-avatars-becris-lineal-color-becris.png" alt=''/>
          <Link className="nav-link active" to="/admin/viewusers" >View Users</Link >
        </li>

        <li className="nav-item pe-3" style={{display:(Cookies.get("isauth")==="true" && Cookies.get("admin"))?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://cdn-icons.flaticon.com/png/512/2684/premium/2684218.png?token=exp=1651221459~hmac=b366e9800096dc8259ba2edb0683cb98" alt=''/>
          <Link className="nav-link active" to="/admin/viewdrivers" >View Drivers</Link >
        </li>


        
        <li className="nav-item pe-3" style={{display:Cookies.get("isauth")==="true"?'flex':'none',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/color/48/000000/logout-rounded--v1.png" alt=''/>
          <Link className="nav-link active" to="/" onClick={handlelogout}>Logout</Link >
        </li>


      </ul>
      
    </div>
  </div>
</nav>


    </>
  )
}
