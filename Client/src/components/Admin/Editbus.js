import Axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import  Cookies  from 'js-cookie'

export default function Editbus() {

    const [newbusname, setnewbusname] = useState('')
	const [newfromstation, setnewfromstation] = useState('')
	const [newtostation, setnewtostation] = useState('')
	const [newcapacity, setnewcapacity] = useState(0)
 const [newbusdriver, setnewbusdriver] = useState('')
 const [starttime, setstarttime] = useState('')
 const [reachtime, setreachtime] = useState('')
 const [ticketprice, setticketprice] = useState(0)


    const {id}=useParams();

    const handlesave=(e)=>{
        // alert(key)
        // alert('Name'+newbusname+"\n From:"+newfromstation+"\nTo: "+newtostation+"\n Capacity: "+newcapacity)
        if(newbusname==='' || ticketprice==='' || newfromstation==='' ||newtostation==='' || newcapacity==='' ||newbusdriver==='' || starttime==='' ||  reachtime==='' )
		{
			alert('Please Fill all fields')
			return
		}
		if (/[^a-zA-Z]/.test(newbusname))
		{
			toast('Enter a valid Bus name!')
			e.preventDefault()
			return
		}
		if (/[^a-zA-Z]/.test(newfromstation))
		{
			toast('Enter a valid source city!')
			e.preventDefault()
			return
		}
		if (/[^a-zA-Z]/.test(newtostation))
		{
			toast('Enter a valid destination city!')
			e.preventDefault()
			return
		}
		if (/[^a-zA-Z]/.test(newbusdriver))
		{
			toast('Enter a valid driver name!')
			e.preventDefault()
			return
		}
		if(!(ticketprice>=25 && ticketprice<=300))
		{
			toast('Ticket price must be between 25 and 300')
			e.preventDefault()
			return
		}
		if(!(newcapacity>=10 && newcapacity<=50))
		{
			toast('Capacity must be between 10 and 50')
			e.preventDefault()
			return
		}
		if(starttime===reachtime)
		{
			toast('Start Time and Reach time cannot be the Same')
			e.preventDefault()
			return
		}

		if(newfromstation===newtostation)
		{
			toast("Source and Destination cannot be the Same!");
			e.preventDefault()
			return;
		}
		

    
        Axios.post('http://localhost:3001/admin/updatebus',{
          id:parseInt(id),
            name:newbusname.toLowerCase(),
            fstation:newfromstation.toLowerCase(),
            tstation:newtostation.toLowerCase(),
            cap:newcapacity,
            busdriver:newbusdriver.toLowerCase(),
            starttime:starttime,
            reachtime:reachtime,
            ticketprice:ticketprice
           

        }).then((resp)=>{
            if(resp.data.ff==='s')
            {
                toast('Updated Bus successfully')
            }
            else
            {
                toast('Bus not Updated')
            }

        })
        e.preventDefault()

	



		Axios.post('http://localhost:3001/bus_admin',{
			adminemail:Cookies.get("admin"),
			busid:id
		}).then(
			(response)=>{
				console.log(response);

			}
		)

    }
  return (
    <>
    <div class="container-contact100">
		<div class="wrap-contact100">
			<form class="contact100-form validate-form">
				<span class="contact100-form-title">
					Edit Bus {id}
				</span>
 <div className="fc">
				<div class="wrap-input100 validate-input" data-validate="Name is required">
					
					<input class="input100" type="text"  name="name" onChange={e=>setnewbusname(e.target.value)} placeholder="New Bus Name" required/>
					<span class="focus-input100"></span>
				</div>

        <div class="wrap-input100 validate-input" data-validate="Name is required">
					
					<input class="input100" type="text"  name="name" onChange={e=>setnewbusdriver(e.target.value)} placeholder="New Bus Driver" required/>
					<span class="focus-input100"></span>
				</div>
        </div>
        <div className="fc">
				<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="text" name="email" onChange={e=>setnewfromstation(e.target.value)}   placeholder="From Bus Stop" required/>
					<span class="focus-input100"></span>
				</div>
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="time" name="email" onChange={e=>setstarttime(e.target.value)}   placeholder="Start Time" required/>
					<span class="focus-input100"></span>
				</div>
</div>
<div className="fc">
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="text" name="email" onChange={e=>setnewtostation(e.target.value)}   placeholder="To Bus Stop" required/>
					<span class="focus-input100"></span>
				</div>
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="time" name="email" onChange={e=>setreachtime(e.target.value)}   placeholder="Reach Time" required/>
					<span class="focus-input100"></span>
				</div>
        </div>
        <div className="fc">
							<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">

								<input class="input100" type="number" name="email" onChange={e => setnewcapacity(e.target.value)} placeholder="Capacity" required />
								<span class="focus-input100"></span>
							</div>
							<div class="wrap-input100 validate-input" data-validate="Valid email is required: ex@abc.xyz">

								<input class="input100" type="number" name="email" onChange={e => setticketprice(e.target.value)} placeholder="Seat Price" required />
								<span class="focus-input100"></span>
							</div>
						</div>

			

				


        <button className='btn btn-outline-success '  onClick={handlesave}>Update</button>
			</form>
		</div>
	</div>



	<div id="dropDownSelect1"></div>

    </>
  )
}