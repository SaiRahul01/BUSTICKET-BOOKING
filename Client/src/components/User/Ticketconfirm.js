import React from 'react'
import { useParams } from 'react-router-dom'
import { useState,useEffect } from 'react';
import StripeCheckout from 'react-stripe-checkout'
import './Ticketconfirm.css'
import { toast } from 'react-toastify';
import Axios from 'axios'
import Cookies from 'js-cookie';

function loadScript(src) {
    
	return new Promise((resolve) => {
		const script = document.createElement('script')
		script.src = src
		script.onload = () => {
			resolve(true)
		}
		script.onerror = () => {
			resolve(false)
		}
		document.body.appendChild(script)
	})
    
}

export default function Ticketconfirm() {
    const [noofseats, setnoofseats] = useState(1)
    const { busid, busname, fromcity, tocity, ticketprice, seatsleft, starttime, reachtime,tdate } = useParams();
    const [totalcost, settotalcost] = useState(ticketprice)
    const [seattsleft, settseatsleft] = useState(0)
    let [f, setf] = useState(0)
    
    useEffect(() => {
      Axios.post('http://localhost:3001/user/getleftseats',{tdate:tdate,busid:busid}).then((reponse)=>{
          console.log(reponse);
          settseatsleft(reponse.data[0].seatsleft)
      })
    }, [busid,tdate])


    

    useEffect(() => {
        setTimeout(() => {
            Axios.post('http://localhost:3001/user/getleftseats',{tdate:tdate,busid:busid}).then((reponse)=>{
                console.log(reponse);
                settseatsleft(reponse.data[0].seatsleft)
            })
        }, 100);
      });
    
    

    useEffect(() => {
        setnoofseats(noofseats)
      settotalcost(noofseats*ticketprice)
    
    
      
    }, [noofseats,ticketprice])
    
    const checkpayment=(e)=>{
        setf(1-f)
        if(parseInt(seatsleft)<0)
        {
            toast('Insufficient seats');
            return
        }
        if(parseInt(noofseats)>parseInt(seatsleft) )
        {
            toast('Insufficient Seats are left')
            return
        }
        // e.preventDefault();
        Axios.post('http://localhost:3001/user/confirmticket',{
            busid:busid,
            totalcost:totalcost,
            noofseats:noofseats,
            tdate:tdate,
            uid:Cookies.get("userid")



        }).then(
            (response)=>{
                toast('Booked successfully!')
                window.location.href="/user/bookings"
                    console.log(response);
            }
        )
        Axios.post('http://localhost:3001/user/decreaseseats',{
            busid:busid,
            tdate:tdate,
            noofseats:noofseats
        }).then((response)=>{
                console.log(response);
               

        })
        window.location.reload()

        



        
    }
    let [product] = useState({
        name: "Sample Book",
        price: totalcost,
        description: "This is a sample book",
      });

      useEffect(() => {
       product.price=totalcost
      }, [totalcost])
      
    async function handleToken(token, addresses) {
        const response = await Axios.post(
          "http://localhost:3001/checkout",
          { token, product }
        );
     
        console.log(response.status)
     
        if (response.status === 200) {
          toast("Success! Check email for details", { type: "success" });
        } else {
          toast("Something went wrong", { type: "error" });
        }
        Axios.post('http://localhost:3001/user/decreaseseats',{
            busid:busid,
            tdate:tdate,
            noofseats:noofseats
        }).then((response)=>{
                console.log(response);

        })
        Axios.post('http://localhost:3001/user/confirmticket',{
            busid:busid,
            totalcost:totalcost,
            noofseats:noofseats,
            tdate:tdate,
            uid:Cookies.get("userid")



        }).then(
            (response)=>{
                toast('Booked successfully!')
                window.location.href="/user/bookings"
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
            <h2 style={{fontSize:'25px', color: 'white',padding:'25px' }}>{seattsleft} seats  left</h2>
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
            {/* <div style={{padding:'25px',paddingBottom:'50px'}}>
            <h2 style={{boxShadow:'none',width:'20em'}}  className="btn btn-success">Pay ₹{totalcost} </h2>
            </div> */}
            {/* <h1 style={{color:'white'}}>{noofseats}</h1>
            <h1 style={{color:'white'}}>{seatsleft}</h1> */}
            <h2 className="text-center" style={{display:parseInt(noofseats)  > parseInt(seatsleft)?'none':'',color:'white'}}>Total Cost - ₹{totalcost}</h2><br />
            <h2 style={{color:'white'}}>{parseInt(noofseats)  > parseInt(seatsleft)?'You cannot book that many seats':''}</h2>
            <StripeCheckout 
                className="center container paybtn" style={{ display:parseInt(noofseats)  > parseInt(seatsleft)?'none':''  ,width:'200px'}}
                stripeKey="pk_test_51KtZSVSE0gT3DMfQUeFvFPMNQkhOsPDcl0EYVid4fPdQM5VPROY6MGIGx2uNsVmuRYB0xJGFvlF2wLocHikbjdQT00VoPOqUKY"
                token={handleToken}
                amount={totalcost * 100}
                name="Sample Book"
                billingAddress
                
                currency='INR'
                panelLabel='Pay'
                description='lmao'
                shippingAddress
            />
            <br /><br />




            </div>
           
        </>

    )
}
