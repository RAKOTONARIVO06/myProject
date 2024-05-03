
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from "react";
import React from "react";
import axios from "axios";
import { Outlet, useNavigate } from "react-router-dom";
import {Bar} from  "react-chartjs-2"
import Modal from '../../components/modal/modal';
import DeleteModal from '../../components/deleteModal/deleteModal';
import { Chart,CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend } from 'chart.js';
Chart.register(CategoryScale,LinearScale,BarElement,Title,Tooltip,Legend);
const Visitor= () => {
   const [min,setMin]=useState();
   const [max,setMax]=useState()
   const [sum,setSum]=useState()
   const navigate = useNavigate();
   const [addModal,setAddModal]=useState(false);
   const [editModal,setEditModal]=useState(false);   
   const [visitors,setVisitors]=useState([]);
   const [idEdit,setIdEdit]=useState();
   const [idDelete,setIdDelete]=useState();
   const [deleteModal,setDeleteModal]=useState();
   const [dat,setDat]=useState([]);
  

   const fetchAllVisitors= async()=>{
    try {
      const res=await axios.get("http://localhost:3001/visitors");
      setVisitors(res.data);
      console.log(visitors);
       // Vérifier si une mise à jour de la liste est nécessaire
       const shouldUpdateList = navigate?.location?.state?.updateList;
       if (shouldUpdateList) {
         // Actualiser la liste
        setVisitors(res.data);
         // Réinitialiser l'indicateur de mise à jour
         navigate("/home", { replace: true, state: { updateList: false } });
       }
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchArrayData = async() =>{
     try{
       const res=await axios.get("http://localhost:3001/count");
       setSum(res.data[0].sumCoast);
       setMin(res.data[0].minCoast);
       setMax(res.data[0].maxCoast);
       setDat(res.data);
    }catch(error){
      alert(error)
    }
  };

  const hideModal=async()=>{
    setAddModal(false);
    setEditModal(false);
  }
  

   useEffect(()=>{
    fetchAllVisitors();
    fetchArrayData();
  },[navigate]);


 

   const handleDelete = async (id) =>{
   setIdDelete(id)
   setDeleteModal(true)
  }

  const showEditModal=  async (idMateriel)=>{
    setIdEdit(idMateriel);
    setEditModal(true);
  }

  const showAddModal=  async ()=>{
         setAddModal(true);
    }


   
   const textAlign="center";
   const width="95%";
  
   
  
    return(
      <>
      <div id='materiel'style={{margin:"30px"}}>
        <div className=' card card-body container' style={{width:"80%"}}>
          
          <h5 style={{textAlign}}>Table visiteurs</h5><br />
          <button className='btn btn-primary' onClick={showAddModal}>Ajout..</button>
          <table className='table table-striped' style={{width}}>
            <thead>
              <tr style={{textAlign}} >
                <th scope='col' >Nom</th>
                <th scope='col'>Nombres de jours</th>
                <th scope='col'>Tarif journalier</th>
                <th scope='col'>Tarif</th>
                <th scope='col' rowSpan={2}>actions</th>
              </tr>  
            </thead>
            <tbody>
              {visitors.map((visitor)=>{
              return(
                <tr key={visitor.id} style={{textAlign}}>
                 
                  <td>{visitor.name}</td>
                  <td>{visitor.dayNumber}</td>
                  <td>{visitor.dailyCoast}</td>
                  <td>{visitor.coast}</td>
                 
                  <td>
                    
                    <button className='btn btn-primary' onClick={() => showEditModal(visitor.id)}>modif..</button>&nbsp;
                    <button onClick={() => handleDelete(visitor.id)} className="btn btn-danger">suppr..</button> 
                  </td>
                </tr>
              )
              })
              }
              </tbody>
            </table>
          </div>
          <div className='container' style={{display:"flex",marginTop:"5px",width:"80%"}}>
            <div className='card card-body container' style={{marginRight:"5px",padding:"50px",width:"40%"}}>
              <h5>Les tarifs : </h5>
              <p >- Tarif minimal: <strong style={{color:"green"}}>{min}</strong></p>
              <p >- Tarif maximal: <strong style={{color:"blue"}}>{max} </strong>  </p>
              <p >- Tarif total: <strong style={{color:"red"}}>{sum}</strong> </p>
            </div>
            <div className='card card-body container' style={{width:"100%"}}>
              <h5 style={{textAlign:"center"}}>Histogramme résumant les 3 tarifs:</h5> 
              <div style={{backgroundColor:"white",width:"90%",borderRadius:"30px",margin:"0 20px"}}><br />
              <Bar data={{
               labels:["Les Tarifs"],
               datasets:[   
                {
                label:"total",
                data:dat.map((data)=>data.sumCoast),
                backgroundColor:"red",
                borderRadius:10,
                } 
            ,
             {
              label:"minimal",
              data:dat.map((data)=>data.minCoast),
              backgroundColor:"green",
              borderRadius:10,
             },
             {
               label:"maximal",
               data:dat.map((data)=>data.maxCoast),
               backgroundColor:"blue",
              borderRadius:10,
             },

             ]
            }} options={{
              plugins:{
                legend:{
                  display:true,
                  position:'top',
                  
                  labels:{
                    font:{
                      size:12,
                    }
                  }
                }
                ,tooltip:{
                  enabled:true,
                  callbacks:{
                    label:(context)=>{
                      const value=context.raw;
                      return 'valeur : '+value
                    }
                  }
                }
              }
            }}/>  
              </div>
        </div>
    </div>
          
          {addModal?
          <div  style={{position:"fixed",top:"0px",left:"0px",bottom:"0px",right:"0px",background:"rgb(0, 0, 0,0.7)"}}>
            
          <div style={{width:"400px",margin:"auto",marginTop:"100px",padding:"20px 50px", backgroundColor:"#ffffff",borderRadius:"20px"}}>
            <button type="button" onClick={hideModal} class="btn-close" aria-label="Close" style={{float:"right", backgroundColor: "red"}} ></button><br/><br/>
            <Modal />
          </div>  
          </div>:editModal? 
          <div style={{position:"fixed",top:"0px",left:"0px",bottom:"0px",right:"0px",background:"rgb(0, 0, 0,0.7)"}}>
            <div style={{width:"400px",margin:"auto",marginTop:"100px",padding:"20px 50px", backgroundColor:"#ffffff",borderRadius:"20px"}}>
              <button type="button" onClick={hideModal} class="btn-close" aria-label="Close" style={{float:"right", backgroundColor: "red"}} ></button><br/><br/>
              <Modal id={idEdit} />
            </div>
          </div> :
          deleteModal? 
         
             
              <DeleteModal id={idDelete} />:""
          }
             
       </div>
       <Outlet />
    </> 
    )
}
 export default Visitor;