import React, { useState } from 'react'
import Axios from 'axios'
// import bgg from  './mainbggg.jpg'
import imgg from './loginbg.jpg'
import './login.css'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import { toast } from 'react-toastify'



export default function Login() {

 


  Axios.defaults.withCredentials=true

  const [emaillogin, setemaillogin] = useState("")
  const [passwordlogin, setpasswordlogin] = useState("")

  const [LoginStatus, setLoginStatus] = useState("")

  const handlelogin = (e) => {
    if(emaillogin==='')
    {
        toast("Please Fill Email field!");
        e.preventDefault()
        return;
    }
    if(passwordlogin==='')
    {
        toast("Please Fill Password field!");
        e.preventDefault()
        return;
    }

    Axios.post('http://localhost:3001/loginadmin', {

      username: emaillogin,
      password: passwordlogin,

    }).then((response) => {

      if (response.data.message) {
        
        toast.error("Wrong Credentials")
      } else {

       
        setLoginStatus(response.data[0].emaillogin)
        Cookies.set("isauth","true")
        Cookies.set("admin",emaillogin)
        Cookies.set("role","admin");
        
        // alert("Successful")
        window.location.href="/admin/profile";
        // e.preventDefault();
      }

    }
    )
    e.preventDefault();


  }
  // useEffect(()=>{
  //   Axios.get("http://localhost:3001/loginchk").then((result)=>{
  //     if(result)
  //     {
  //       alert(result.user)

  //     }
  //     console.log(result);
  //   })
  // },[])

  return (

    <>
      <div className='maindiv' style={{ height: '700px', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', backgroundRepeat: 'no-repeat', backgroundImage: `url(${imgg})` }}>
        <div className="content" style={{ paddingTop: '200px', width: '400px' }}>
          {/* <img src="https://thumbs.dreamstime.com/b/retro-train-illustration-isolated-white-background-design-element-logo-label-emblem-sign-retro-train-illustration-isolated-114272289.jpg" alt=''/> */}
          <div class="login-box">
            <h2>Admin Login</h2>
            <form>
              <div class="user-box">
                <input type="email" onChange={e => setemaillogin(e.target.value)}  required="" />
                <label>Admin Email</label>
              </div>
              <div class="user-box">
                <input type="password" onChange={e => setpasswordlogin(e.target.value)} name="" required="" />
                <label>Password</label>
              </div>
              <button className="button-9" onClick={handlelogin} >LOGIN</button>
            </form>
          </div>



        </div>


      </div>

    </>

  )
}



