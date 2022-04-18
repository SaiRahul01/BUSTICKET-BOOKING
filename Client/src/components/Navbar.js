import React from 'react';
import {Link} from "react-router-dom";
export default function Navbar() {
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

        <li className="nav-item pe-3" style={{display:'flex',alignItems:'center'}}>
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24" height="24" fill='white'
        viewBox="0 0 64 64"
        ><path d="M 32 3 L 1 28 L 1.4921875 28.654297 C 2.8591875 30.477297 5.4694688 30.791703 7.2304688 29.345703 L 32 9 L 56.769531 29.345703 C 58.530531 30.791703 61.140812 30.477297 62.507812 28.654297 L 63 28 L 54 20.742188 L 54 8 L 45 8 L 45 13.484375 L 32 3 z M 32 13 L 8 32 L 8 56 L 56 56 L 56 35 L 32 13 z M 26 34 L 38 34 L 38 52 L 26 52 L 26 34 z"></path></svg>
         <Link class="nav-link active" aria-current="page" to="/">Home</Link >
        </li>

        <li className="nav-item pe-3"  style={{display:'flex',alignItems:'center'}} >
        <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
        width="24" height="24"
        viewBox="0 0 48 48"
><path fill="#2196F3" d="M37,40H11l-6,6V12c0-3.3,2.7-6,6-6h26c3.3,0,6,2.7,6,6v22C43,37.3,40.3,40,37,40z"></path><path fill="#FFF" d="M22 20H26V31H22zM24 13A2 2 0 1 0 24 17 2 2 0 1 0 24 13z"></path></svg>
<Link class="nav-link active" aria-current="page" to="/about">About</Link >
        </li>

        <li className="nav-item pe-3" style={{display:'flex',alignItems:'center'}} >

        <img style={{height:'24px',width:'24px'}} alt='' src="https://img.icons8.com/external-bearicons-outline-color-bearicons/64/000000/external-sign-up-call-to-action-bearicons-outline-color-bearicons-1.png"/>
          <Link className="nav-link active" to="/signup">Sign Up </Link >
        </li>


        <li className="nav-item pe-3" style={{display:'flex',alignItems:'center'}}>
        <img  style={{height:'28px',width:'28px'}} src="https://img.icons8.com/external-prettycons-lineal-color-prettycons/49/000000/external-key-technology-prettycons-lineal-color-prettycons.png" alt=''/>
          <Link className="nav-link active" to="/login">Login</Link >
        </li>
       
      </ul>
      
    </div>
  </div>
</nav>


    </>
  )
}
