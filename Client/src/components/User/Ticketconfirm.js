import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import './Ticketconfirm.css'


export default function Ticketconfirm() {
    const [noofseats, setnoofseats] = useState(1)
    const [totalcost, settotalcost] = useState(0)
    
    

    useEffect(() => {
        setnoofseats(noofseats)
      settotalcost(noofseats*ticketprice)
    
      
    }, [noofseats])
    

    const { busid, busname, fromcity, tocity, ticketprice, seatsleft, starttime, reachtime } = useParams();
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
            <h2  style={{fontSize:'25px', color: 'white',padding:'25px' }}>{ticketprice} per seat</h2>
            <h2 style={{fontSize:'25px', color: 'white',padding:'25px' }}>{seatsleft} seats  left</h2>
            {/* <input style={{width:'200px',height:'50px',marginLeft:'20px'}}></input> */}
            <div>
            <label style={{color:'white',fontSize:'25px'}} for="cars">Number of Tickets</label>
            <select onChange={e=>setnoofseats(e.target.value)}  style={{width:'80px',height:'50px',marginLeft:'20px'}}  name="cars" id="cars">  
                <option   value = "1">1</option>
                <option  value="2">2</option>
                <option  value="3">3</option>
                <option  value="4">4</option>
                <option   value="4">5</option>
                <option  value="4">6</option>
            </select>
            </div>
            <div style={{padding:'25px',paddingBottom:'50px'}}>
            <button style={{boxShadow:'none'}} className="btn btn-success">Pay ₹{totalcost} </button>
            </div>
            </div>
            </div>
        </>

    )
}
