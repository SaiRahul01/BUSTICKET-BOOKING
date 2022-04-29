import Axios from 'axios'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import  Cookies  from 'js-cookie'
import './Deletebus.css'

export default function Deletebus() {

    const {id}=useParams();

    const handledelete=(e)=>{
      Axios.post('http://localhost:3001/deletebus',{id:parseInt(id)}).then((response)=>{
        console.log(response);
        if(response.data.f)
        {
          
          window.location.href="/admin/viewbuses"
          toast('Deleted Successfully')
        
          return
        }
       
          toast('There are Bookings with this bus, cannot delete!')
        
        
        
          
        
      })
      e.preventDefault()
        

    }
    const handlecancel=(e)=>{
    
      window.location.href="/admin/viewbuses";
      e.preventDefault()
    
    }
  return (
    <>
    <div class="container-contact100">
		<div class="wrap-contact100">
			<form class="contact100-form validate-form">
				<span class="contact100-form-title">
					Delete Bus {id}
				</span>
        <div className="flex-container">
         
            <div>
            <button className="btn btn-secondary" onClick={handlecancel}>
              Cancel
            </button>

            </div>
            <div>
          
            <button className="btn btn-danger" onClick={handledelete}>
              Delete
            </button>

            </div>
         
            
          
        </div>
        

 
			</form>
		</div>
	</div>



	<div id="dropDownSelect1"></div>

    </>
  )
}