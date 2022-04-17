import Axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

export default function Editbus() {

    const [newbusname, setnewbusname] = useState('')
	const [newfromstation, setnewfromstation] = useState('')
	const [newtostation, setnewtostation] = useState('')
	const [newcapacity, setnewcapacity] = useState(0)
 const [newbusdriver, setnewbusdriver] = useState('')


    const {id}=useParams();

    const handlesave=(e)=>{
        // alert(key)
        // alert('Name'+newbusname+"\n From:"+newfromstation+"\nTo: "+newtostation+"\n Capacity: "+newcapacity)
    
        Axios.post('http://localhost:3001/admin/updatebus',{
          id:parseInt(id),
            name:newbusname,
            fstation:newfromstation,
            tstation:newtostation,
            cap:newcapacity,
            busdriver:newbusdriver
           

        }).then((resp)=>{
            if(resp.data.ff==='s')
            {
                alert('Updated')
            }
            else
            {
                alert('Not Updated')
            }

        })
        e.preventDefault()

    }
  return (
    <>
    <div class="container-contact100">
		<div class="wrap-contact100">
			<form class="contact100-form validate-form">
				<span class="contact100-form-title">
					Edit Bus {id}
				</span>

				<div class="wrap-input100 validate-input" data-validate="Name is required">
					
					<input class="input100" type="text"  name="name" onChange={e=>setnewbusname(e.target.value)} placeholder="New Bus Name" required/>
					<span class="focus-input100"></span>
				</div>

        <div class="wrap-input100 validate-input" data-validate="Name is required">
					
					<input class="input100" type="text"  name="name" onChange={e=>setnewbusdriver(e.target.value)} placeholder="New Bus Driver" required/>
					<span class="focus-input100"></span>
				</div>

				<div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="text" name="email" onChange={e=>setnewfromstation(e.target.value)}   placeholder="From Bus Stop" required/>
					<span class="focus-input100"></span>
				</div>
        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="text" name="email" onChange={e=>setnewtostation(e.target.value)}   placeholder="To Bus Stop" required/>
					<span class="focus-input100"></span>
				</div>

        <div class="wrap-input100 validate-input" data-validate = "Valid email is required: ex@abc.xyz">
					
					<input class="input100" type="number" name="email" onChange={e=>setnewcapacity(e.target.value)}  placeholder="New Capacity" required/>
					<span class="focus-input100"></span>
				</div>

			

				


        <button  onClick={handlesave}>Update</button>
			</form>
		</div>
	</div>



	<div id="dropDownSelect1"></div>

    </>
  )
}
