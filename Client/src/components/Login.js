import React, { useState } from 'react'
import Axios from 'axios'
// import bgg from  './mainbggg.jpg'
import imgg from './loginbg.jpg'
import './login.css'
import { useEffect } from 'react'
import Cookies from 'js-cookie'
import ProtectedRoute from '../ProtectedRoute'
import { toast } from 'react-toastify'


export default function Login() {


  useEffect(() => {
    Axios.post('http://localhost:3001/getuserdetails',{useremail:Cookies.get("user")}).then(
      (response)=>{
        console.log("Should be here");
        console.log(response.data);
        Cookies.set("userid",response.data[0])
        
      }
    )
  }, [])
  
 


  Axios.defaults.withCredentials=true

  const [emaillogin, setemaillogin] = useState("")
  const [passwordlogin, setpasswordlogin] = useState("")

  const [LoginStatus, setLoginStatus] = useState("")
  // const [isLogged, setisLogged] = useState(false)

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

    Axios.post('http://localhost:3001/loginuser', {

      username: emaillogin,
      password: passwordlogin,

    }).then((response) => {

      if (response.data.message) {
        
        toast.error("Wrong Credentials")
      } else {

       
        setLoginStatus(response.data[0].emaillogin)
        Cookies.set("isauth","true")
        Cookies.set("user",emaillogin)
        Cookies.set("role","user")
        // setisLogged(true)
        // alert("Successful")
        window.location.href="/user/profile";
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
            <h2>User Login</h2>
            <form>
              <div class="user-box">
                <input type="text" onChange={e => setemaillogin(e.target.value)} name="" required="" />
                <label>User Email</label>
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



