import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import './Ticketconfirm.css'
import { toast } from 'react-toastify';
import Axios from 'axios'


export default function Ticketconfirm() {
    const [noofseats, setnoofseats] = useState(1)
    const [totalcost, settotalcost] = useState(0)
    const { busid, busname, fromcity, tocity, ticketprice, seatsleft, starttime, reachtime,tdate } = useParams();
    
    

    useEffect(() => {
        setnoofseats(noofseats)
      settotalcost(noofseats*ticketprice)
    
      
    }, [noofseats])
    
    const checkpayment=(e)=>{
        if(noofseats>seatsleft)
        {
            toast('You cannot choose more seats than available')
            return
        }
        e.preventDefault();
        Axios.post('http://localhost:3001/user/confirmticket',{
            busid:busid,
            totalcost:totalcost,
            noofseats:noofseats,
            tdate:tdate



        }).then(
            (response)=>{
                toast('Booked successfully!')
                    console.log(response);
            }
        )



        
    }

   
    return (
        <>
        <br /><br />
        
        <h1 className='text-center' style={{color:'white'}}>Booking Confirmation</h1>
            
            <div className='text-center' style={{ width:'900px',border:'2px solid white',marginLeft:'300px',marginTop:'10px'}}>
            <div className="parent" >


                


            <h2 style={{fontSize:'25px',color: 'white',padding:'25px' }}>ID {busid}</h2>
            
            <h2 style={{fontSize:'25px', color: 'white',padding:'25px' }}>From {fromcity}</h2>
            <h2 style={{fontSize:'25px', color: 'white',padding:'25px' }}>To {tocity}</h2>
            <h2 style={{fontSize:'25px', color: 'white',padding:'25px' }}>Bus {busname}</h2>
            <h2 style={{fontSize:'25px', color: 'white',padding:'25px' }}>Starts {starttime}</h2>
            <h2 style={{fontSize:'25px', color: 'white',padding:'25px' }}>Reaches {reachtime}</h2>
            
       

            </div>
            <div className="parent2">
            <h2  style={{fontSize:'25px', color: 'white',padding:'25px' }}>₹{ticketprice} per seat</h2>
            <h2 style={{fontSize:'25px', color: 'white',padding:'25px' }}>{seatsleft} seats  left</h2>
            {/* <input style={{width:'200px',height:'50px',marginLeft:'20px'}}></input> */}
            <div>
            <label style={{color:'white',fontSize:'25px'}} for="cars">Number of Tickets</label>
            <select onChange={e=>setnoofseats(e.target.value)}  style={{width:'80px',height:'30px',marginLeft:'20px'}}  name="cars" id="cars">  
                <option   value = "1">1</option>
                <option  value="2">2</option>
                <option  value="3">3</option>
                <option  value="4">4</option>
                <option   value="5">5</option>
                <option  value="6">6</option>
            </select>
            </div>
            <div style={{fontSize:'20px',color:'white'}}>
                Date of Journey {tdate}

            </div>
            
            </div>
            <div style={{padding:'25px',paddingBottom:'50px'}}>
            <button style={{boxShadow:'none',width:'20em'}} onClick={checkpayment} className="btn btn-success">Pay ₹{totalcost} </button>
            </div>




            </div>
        </>

    )
}
