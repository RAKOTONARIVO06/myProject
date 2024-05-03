import 'bootstrap/dist/css/bootstrap.min.css';
import { Location } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useState,useEffect } from "react";
import React from "react";
import "./deleteModal.css"
import axios from 'axios';
const DeleteModal = (props)=>{
const navigate= useNavigate()
    const hideModal= async()=>{
     window.location.reload();
    }
    const handleClick= async()=>{
        try {
                console.log(props.id);
                await axios.delete(`http://localhost:3001/delete/${props.id}`);
                 window.location.reload();
            } catch (error) {
               console.log(error);
            }
    }

   return(
    <>
       <div className="myModal">
           <div className="modalContainer" style={{width:"300px",borderRadius:"10px"}}>
                <div className=" card ">
                   <div className="card-header bg-default border-default">
                        <h5 style={{textAlign:"center"}}>Confirmation</h5>
                    </div>
                    <div className= "card-body text-success">
                        <p>Etes vous sûre de vouloir supprimer cet élément? </p>      
                        
                    </div>
                    <div className="card-footer bg-default border-default" style={{textAlign:"center"}}>
                        <button id='no' className='style' onClick={hideModal}>Non</button>&nbsp;
                        <button id='yes' className='style' onClick={handleClick} >Oui</button>
                    </div>
                </div>
            </div>
        </div>
    </>
   )
}
export default DeleteModal;