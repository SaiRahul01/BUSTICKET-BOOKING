import  Axios  from 'axios'
import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './main.css'


export default function Signup() {

        const [name, setname] = useState('')
        const [email, setemail] = useState('')
        const [password, setpassword] = useState('')
        const [mobilenumber, setmobilenumber] = useState('')
        const [age, setage] = useState(0)
        const [city, setcity] = useState('')
        const [pincode, setpincode] = useState(0)
        const [streetname, setstreetname] = useState('')
        const [houseno, sethouseno] = useState(0)
        const [gender, setgender] = useState('')

        const [regstatus, setregstatus] = useState('')


    const togglepwdvis=(e)=>{
        let x=document.getElementById('pwdfield');
        if(x.type==='password')
        {
            x.type='text';
        }
        else
        {
            x.type='password';
        }
    }



    const handleregister=(e)=>{
        if(name==='' || email==='' || password==='' || mobilenumber==='' ||age===''||city===''|| pincode===''|| streetname===''||houseno==='' )
        {
           toast.error('Enter all fields')
            return;
        }

        var emailsArray = email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (emailsArray != null && emailsArray.length) {

        }
        else
        {
            toast.success('🦄 Wow so easy!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                });
            return;
        }
        e.preventDefault();
        if((/^\d{10}$/).test(mobilenumber) || (mobilenumber.value<=9999999999 && mobilenumber.value>=1000000000))
        {

        }
        else
        {
            toast('Mobile Number is not valid');

            return;
        }



        Axios.post('http://localhost:3001/registeruser',{
            name:name,
            email:email,
            password:password,
            mobilenumber:mobilenumber,
            age:age,
            city:city,
            pincode:pincode,
            houseno:houseno,
            streetname:streetname,
            gender:gender

        }).then(
            (response)=>{
                if(response.data.op)
                {
                    toast("User Already Exists !! ")
                }
                else
                {
                    toast("Registered Successfully!")
                }
                // console.log(response.data);

            }
            // (response)=>{
            //     if(response.data.message)
            //     {
            //         setregstatus(response.data.message)
            //     }
            //     else
            //     {
            //         toast("Registered Successfully");
            //     }

            // }






        )
        e.preventDefault();


    }

  return (

    <>
    {/* <ToastContainer
        position="top-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        closeButton={false}
        /> */}

    
         <div className="page-wrapper bg-gra-01 p-t-30 p-b-80 font-poppins"   >
   
             <div></div>

        <div className="wrapper  wrapper--w960 "  style={{marginLeft:'240px'}} >
                         <br/>
                         <br/>
                         <br/>
                    <h2 className="title text-center">Registration </h2>

                    <form method="POST"  >
                       <div className="fc">

                        <div className="input-group">
                            <input className="input--style-3" type="text" onChange={e=>setname(e.target.value)} placeholder="Name" name="username" required />
                        </div>

                        <div className="input-group">
                            <input className="input--style-3" type="text" pattern="[1-9]{1}[0-9]{9}" onChange={e=>setmobilenumber(e.target.value)}  placeholder="Mobile Number" name="mobilenumber"  required />
                        </div>
                       </div>

                    <div className="fc">

                         <div className="input-group">
                             <input className="input--style-3" type="number" onChange={e=>setage(e.target.value)} placeholder="Age" name="age"  required />

                         </div>

                          {/* <div>
                             <p style={{color:"white"}}>Gender</p>
                             <input type="radio"></input>
                                 <label>Male</label>
                         </div> */}
                         <div className="input-group">
                             <input className="input--style-3" type="text" onChange={e=>setgender(e.target.value)} placeholder="Gender" name="age"  required />

                         </div>

                    
                     </div>

               <div className="fc">

                        <div className="input-group col">
                            <input className="input--style-3" type="email" onChange={e=>setemail(e.target.value)} placeholder="Email" name="email"  required />
                        </div>

                        <div className="input-group" style={{display:'flex',alignItems:'center'}}>
                            <input className="input--style-3" id='pwdfield' onChange={e=>setpassword(e.target.value)}  type="password" placeholder="Password" name="password"  required />

                            <div onClick={togglepwdvis}>
                            <span style={{color:'white',float: 'right',marginLeft: '-25px',marginTop: '0px',position: 'relative',zIndex:'  2'}}
                             toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>

                            </div>

                        </div>
                          </div>



                        <br />
                       <div className="fc">

                        <div className="input-group">
                            <input className="input--style-3" type="text" onChange={e=>setcity(e.target.value)} placeholder="City" name="email"  required />

                         </div>

                        <div className="input-group">
                            <input className="input--style-3" type="number" onChange={e=>setpincode(e.target.value)} placeholder="Pincode" name="email"  required />

                        </div>

                        </div>

                    <div className="fc">

                        <div className="input-group">
                            <input className="input--style-3" type="text" onChange={e=>sethouseno(e.target.value)} placeholder="House no" name="email"  required />

                        </div>

                        <div className="input-group">
                            <input className="input--style-3" type="text" onChange={e=>setstreetname(e.target.value)} placeholder="Street Name" name="email"  required />

                        </div>

                           </div>


                        <div className="p-t-10 text-center">
                            <button className="btn-ded btn--pill btn--green" onClick={handleregister} type="submit">SUBMIT</button>
                        </div>
                    </form>

        </div>
    </div>


    </>
  )
}