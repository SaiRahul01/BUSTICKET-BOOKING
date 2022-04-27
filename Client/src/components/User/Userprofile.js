import React from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import { useEffect,useState } from 'react'
import  Axios  from 'axios'


export default function Userprofile() {

  const [userdetails, setuserdetails] = useState({})
  useEffect(() => {
    Axios.post('http://localhost:3001/getuserdetails',{
        useremail:Cookies.get("user")
      
    }).then((response)=>{
          setuserdetails(response.data[0])
          Cookies.set("userid",userdetails.id)
    })
  }, [userdetails.id])
  
  return (
    <>
    <br />

    {/* <h1 className='text-center' style={{color:'white'}}>Hello User</h1> */}
    <br /><br />

    <div className="mainn" style={{border:'5px solid white',borderRadius:'15px',width:'750px',height:'400px',marginLeft:'400px',color:'white'}}>
        <div>
            <img style={{width:'250px',height:'250px',marginTop:'70px',marginLeft:'20px'}} src="https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png" alt="" />
        </div>
        <div style={{marginLeft:'300px',marginTop:'-270px'}}>
        <table style={{width: "404px",fontSize:'20px'}}>
        <tbody>
        <tr className='text-center'>
        <td style={{width: "404px",height:'50px',fontSize:'20px'}}>User ID</td>
        <td style={{width: "404px",height:'50px'}}>{userdetails.id}</td>
        </tr>
        <tr className='text-center'>
        <td style={{width: "404px",height:'50px',fontSize:'20px'}}>Name</td>
        <td style={{width: "404px",height:'50px'}}>{userdetails.name}</td>
        </tr>
        <tr className='text-center'>
        <td style={{width: "354px",height:'50px'}}>Email</td>
        <td style={{width: "354px",height:'50px'}}>{Cookies.get("user")}</td>
        </tr>
        <tr className='text-center'>
        <td style={{width: "354px",height:'50px'}}>MobileNumber</td>
        <td style={{width: "354px",height:'50px'}}>{userdetails.mobilenumber}</td>
        </tr>
        <tr className='text-center'>
        <td style={{width: "354px",height:'50px'}}>Role</td>
        <td style={{width: "354px",height:'50px'}}>User</td>
        </tr>
        <tr className='text-center'>
        <td style={{width: "354px",height:'50px'}}>Age</td>
        <td style={{width: "354px",height:'50px'}}>{userdetails.age}</td>
        </tr>
        {/* <tr>
        <td style="width: 34px;">&nbsp;</td>
        <td style="width: 18px;">&nbsp;</td>
        </tr>
        <tr>
        <td style="width: 34px;">&nbsp;</td>
        <td style="width: 18px;">&nbsp;</td>
        </tr>
        <tr>
        <td style="width: 34px;">&nbsp;</td>
        <td style="width: 18px;">&nbsp;</td>
        </tr>
        <tr>
        <td style="width: 34px;">&nbsp;</td>
        <td style="width: 18px;">&nbsp;</td>
        </tr>
        <tr>
        <td style="width: 34px;">&nbsp;</td>
        <td style="width: 18px;">&nbsp;</td>
        </tr>
        <tr>
        <td style="width: 34px;">&nbsp;</td>
        <td style="width: 18px;">&nbsp;</td>
        </tr>
        <tr>
        <td style="width: 34px;">&nbsp;</td>
        <td style="width: 18px;">&nbsp;</td>
        </tr>
        <tr>
        <td style="width: 34px;">&nbsp;</td>
        <td style="width: 18px;">&nbsp;</td>
        </tr>
        <tr>
        <td style="width: 34px;">&nbsp;</td>
        <td style="width: 18px;">&nbsp;</td>
        </tr> */}
        </tbody>
        </table>

        </div>
    </div>
    </>
  )
}
