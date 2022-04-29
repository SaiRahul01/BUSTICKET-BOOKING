import Axios from 'axios'
import React, { useState,useEffect } from 'react'
// eslint-disable-next-line no-unused-vars
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import './main.css'


export default function Signup() {
    const [maxuser, setmaxuser] = useState('')
    useEffect(() => {
        setTimeout(() => {
            Axios.get('http://localhost:3001/getmaxuserr').then((response)=>{
              //   setmaxi(response.data[0])
                setmaxuser(response.data[0].f);
                    console.log("lmao only"+maxuser);
            })
        }, 500);
      }, )

    const [name, setname] = useState('')
    const [email, setemail] = useState('')
    const [password, setpassword] = useState('')
    const [mobilenumber, setmobilenumber] = useState('')
    const [age, setage] = useState(0)
    const [city, setcity] = useState('')
    
  
    const [streetname, setstreetname] = useState('')
    const [houseno, sethouseno] = useState(0)
    const [gender, setgender] = useState('')

    const [regstatus, setregstatus] = useState('')


    const togglepwdvis = (e) => {
        let x = document.getElementById('pwdfield');
        if (x.type === 'password') {
            x.type = 'text';
        }
        else {
            x.type = 'password';
        }
    }
    



    const handleregister = (e) => {
        if (name === '' || email === '' || password === '' || mobilenumber === '' || age === '' || city === '' || streetname === '' || houseno === '') {
            toast.error('Enter all fields')
            return;
        }

        var emailsArray = email.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
        if (emailsArray != null && emailsArray.length) {

        }
        else {
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
        if ((/^\d{10}$/).test(mobilenumber) || (mobilenumber.value <= 9999999999 && mobilenumber.value >= 1000000000)) {

        }
        else {
            toast('Mobile Number is not valid');

            return;
        }

        if(age<18)
        {
            toast('Minors are not allowed to register');
            return;
        }



        Axios.post('http://localhost:3001/registeruser', {
            name: name,
            email: email,
            password: password,
            mobilenumber: mobilenumber,
            age: age,
            city: city,
            maxuser:maxuser ,
        
            houseno: houseno,
            streetname: streetname,
            gender: gender

        }).then(
            (response) => {
                if (response.data.op) {
                    alert("User Already Exists !! ")
                }
                else {
                    alert("Registered Successfully!")
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


            <div className="page-wrapper bg-gra-01 p-t-30 p-b-80 font-poppins"    >

                <div></div>

                <div className="wrapper  wrapper--w960 " style={{ marginLeft: '240px',border:'2px solid  white',borderRadius:'5px',padding:'30px' }} >
            
                  
           
                    <h1 className="title text-center">Registration </h1>

                    <form method="POST"  >
                        <div className="fc">

                            <div className="input-group">
                                <input className="input--style-3" type="text" onChange={e => setname(e.target.value)} placeholder="Name" name="username" required />
                            </div>

                            <div className="input-group">
                                <input className="input--style-3" type="text" pattern="[1-9]{1}[0-9]{9}" onChange={e => setmobilenumber(e.target.value)} placeholder="Mobile Number" name="mobilenumber" required />
                            </div>
                        </div>

                        <div className="fc">

                            <div className="input-group">
                                <input className="input--style-3" type="number" onChange={e => setage(e.target.value)} placeholder="Age" name="age" required />

                            </div>

                            {/* <div>
                             <p style={{color:"white"}}>Gender</p>
                             <input type="radio"></input>
                                 <label>Male</label>
                         </div> */}
                            {/* <div className="input-group">
                             <input className="input--style-3" type="text" onChange={e=>setgender(e.target.value)} placeholder="Gender" name="age"  required />

                         </div> */}
                            <div class="col-md-6 mb-4">

                               

                                <div class="form-check form-check-inline">
                                <h4 style={{color:'white'}} class="mb-2 pb-1">Gender </h4>
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="femaleGender"
                                        value="option1"
                                      
                                        onChange={e=>setgender('Female')} 
                                    />
                                    <label style={{color:'white'}} class="form-check-label" for="femaleGender">Female</label>
                                </div>

                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="maleGender"
                                        value="option2"
                                        onChange={e=>setgender('Male')} 
                                    />
                                    <label style={{color:'white'}} class="form-check-label" for="maleGender">Male</label>
                                </div>

                                <div class="form-check form-check-inline">
                                    <input
                                        class="form-check-input"
                                        type="radio"
                                        name="inlineRadioOptions"
                                        id="otherGender"
                                        value="option3"
                                        onChange={e=>setgender('Other')} 
                                    />
                                    <label style={{color:'white'}} class="form-check-label" for="otherGender">Other</label>
                                </div>

                            </div>


                        </div>

                        <div className="fc">

                            <div className="input-group col">
                                <input className="input--style-3" type="email" onChange={e => setemail(e.target.value)} placeholder="Email" name="email" required />
                            </div>

                            <div className="input-group" style={{ display: 'flex', alignItems: 'center' }}>
                                <input className="input--style-3" id='pwdfield' onChange={e => setpassword(e.target.value)} type="password" placeholder="Password" name="password" required />

                                <div onClick={togglepwdvis}>
                                    <span style={{ color: 'white', float: 'right', marginLeft: '-25px', marginTop: '0px', position: 'relative', zIndex: '  2' }}
                                        toggle="#password-field" className="fa fa-fw fa-eye field-icon toggle-password"></span>

                                </div>

                            </div>
                        </div>



                        <br />
                        <div className="fc">

                            <div className="input-group">
                                <input className="input--style-3" type="text" onChange={e => setcity(e.target.value)} placeholder="City" name="email" required />

                            </div>

                            <div className="input-group" style={{visibility:'hidden'}}>
                               <br /><br /><br />

                            </div>

                        </div>

                        <div className="fc">

                            <div className="input-group">
                                <input className="input--style-3" type="text" onChange={e => sethouseno(e.target.value)} placeholder="House no" name="email" required />

                            </div>

                            <div className="input-group">
                                <input className="input--style-3" type="text" onChange={e => setstreetname(e.target.value)} placeholder="Street Name" name="email" required />

                            </div>

                        </div>


                        <div className="text-center">
                            <button className='button-41' style={{boxShadow:'none',width:'150px'}}  onClick={handleregister} type="submit">SUBMIT</button>
                        </div>
                    </form>

                </div>
            </div>


        </>
    )
}



/* CSS */
