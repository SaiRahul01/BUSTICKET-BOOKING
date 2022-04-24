import Cookies from 'js-cookie'
import React from 'react'
import './Aprofile.css'
import { useEffect,useState } from 'react'
import  Axios  from 'axios'


export default function Aprofile() {
  const adminemail=Cookies.get("admin")
  const [admindetails, setadmindetails] = useState({})

  useEffect(() => {
    Axios.post('http://localhost:3001/getadmindetails',{
        adminemail:Cookies.get("admin")
      
    }).then((response)=>{
      console.log("Res->"+response);
        setadmindetails(response.data[0])
    })
  }, [])
  


  return (
    <>
     <br />

{/* <h1 className='text-center' style={{color:'white'}}>Hello User</h1> */}
<br />
<h1 className='text-center' style={{color:'white'}}>ADMIN</h1>

<br />

<div className="mainn" style={{border:'5px solid white',borderRadius:'15px',width:'750px',height:'400px',marginLeft:'400px',color:'white'}}>
    <div>
        <img style={{width:'250px',height:'250px',marginTop:'70px',marginLeft:'20px'}} src="https://cswnn.edu.in/system/files/2021-02/avatar-png-1-original.png" alt="" />
    </div>
    <div style={{marginLeft:'300px',marginTop:'-200px'}}>
    <table style={{width: "404px",fontSize:'20px'}}>
    <tbody>
    <tr className='text-center'>
    <td style={{width: "404px",height:'50px',fontSize:'20px'}}>Name</td>
    <td style={{width: "404px",height:'50px'}}>{admindetails.name}</td>
    </tr>
    <tr className='text-center'>
    <td style={{width: "354px",height:'50px'}}>Email</td>
    <td style={{width: "354px",height:'50px'}}>{Cookies.get("admin")}</td>
    </tr>
    <tr className='text-center'>
    <td style={{width: "354px",height:'50px'}}>MobileNumber</td>
    <td style={{width: "354px",height:'50px'}}>{admindetails.mobilenumber}</td>
    </tr>
    
    
    
    </tbody>
    </table>

    </div>
</div>

    </>



  )
}
