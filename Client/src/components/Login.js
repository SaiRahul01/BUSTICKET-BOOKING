import React, { useState } from 'react'
import Axios from 'axios'
// import bgg from  './mainbggg.jpg'
import imgg from './loginbg.jpg'
import './login.css'
export default function Login() {

  const [emaillogin, setemaillogin] = useState("")
  const [passwordlogin, setpasswordlogin] = useState("")

  const [LoginStatus, setLoginStatus] = useState("")

  const handlelogin = (e) => {

    Axios.post('http://localhost:3001/loginuser', {

      username: emaillogin,
      password: passwordlogin,

    }).then((response) => {

      if (response.data.message) {
        
        alert("Unsuccessful")
      } else {
        setLoginStatus(response.data[0].emaillogin)
        alert("Successful")
        e.preventDefault();
      }

    }
    )
    e.preventDefault();


  }

  return (

    <>
      <div className='maindiv' style={{ height: '700px', backgroundSize: 'cover', backgroundPosition: 'center', width: '100%', backgroundRepeat: 'no-repeat', backgroundImage: `url(${imgg})` }}>
        <div className="content" style={{ paddingTop: '200px', width: '400px' }}>
          {/* <img src="https://thumbs.dreamstime.com/b/retro-train-illustration-isolated-white-background-design-element-logo-label-emblem-sign-retro-train-illustration-isolated-114272289.jpg" alt=''/> */}
          <div class="login-box">
            <h2>Login</h2>
            <form>
              <div class="user-box">
                <input type="text" onChange={e => setemaillogin(e.target.value)} name="" required="" />
                <label>Username</label>
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



