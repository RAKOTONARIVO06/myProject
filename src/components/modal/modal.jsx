import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet,useNavigate,Link ,useLocation,useParams} from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const Modal= (props)=>{
   const location=useLocation();
 
  const [placeTag,setPlaceTag]=useState();
  const [prop,setProp]=useState()
  var err;
    const height="30px";
    const navigate=useNavigate();
    const [visitors,setVisitor]=useState({
      number:"",
      name:"",
      dayNumber:"",
      dailyCoast:"",
    })

    useEffect(()=>{
      if(props.id){
        setProp(props.id)
        const userDetails=async ()=>{
         
         console.log(props.id+ "io le params");
         axios.get("http://localhost:3001/search/"+props.id).then(res=>{
           setVisitor(res.data[0]);
           props.id=null;
           console.log(props.id+ "io le params");
         }
         ).catch(err=>console.log(err));
         
        };
        userDetails();
      }
      
    },[props.id])

    const handleChange = (e)=>{
        setVisitor((prev)=>({...prev,[e.target.name]:e.target.value}));
       };
     
       const handleClick = async(e) =>{
         e.preventDefault();
         if(props.id){
          try {
            if(visitors.number===""){
              
              setPlaceTag(1)
              
            }else if(visitors.name===""){
              
              setPlaceTag(2)
          
            }else if(visitors.dayNumber===""){
              setPlaceTag(3)
            }
            else if(visitors.dailyCoast===""){
                setPlaceTag(4)
            }
            else{
              await axios.put(`http://localhost:3001/update/${props.id}`, visitors);
              alert("updated");
              navigate("/home", {state: {updateList:true} }) ;
              window.location.reload();
            }}catch (error) {
              alert(error+" dea");
            
            }
           // Si idMateriel est présent, effectuez une requête de mise à jour
       
        } else {
          try {
           if(visitors.number===""){
             
             setPlaceTag(1)
             
           }else if(visitors.name===""){
             
             setPlaceTag(2)
         
           }else if(visitors.dayNumber===""){
             setPlaceTag(3);
           }
           else if(visitors.dailyCoast===""){
             setPlaceTag(4)
           }

           else{
            const response = await axios.post("http://localhost:3001/createVisitors/",visitors);
            if(response.data.errno==1062)
            {
              alert(response.data.sqlMessage);
            }else{
                alert("Submited");
             // Rediriger en passant une fonction de rappel pour mettre à jour la liste
             navigate("/home", { state: { updateList:true } });
             window.location.reload();
            }
           
            } 
            
         }catch (error) {
          alert(error+" dea");
        
        }
      }
    }

   return (
    <>
    <div className='container'>
        <form action="">  
           <label htmlFor="id">{placeTag==1? <p style={{color:"red"}}>n°visiteur*</p>:"n°visiteur"} </label>
         {prop?<input type="text" className='form-control' style={placeTag==1?{borderColor:"red"}:{}} value={visitors.number} name="number" onChange={handleChange} disabled/>:
         <input type="text" className='form-control' style={placeTag==1?{borderColor:"red"}:{}} value={visitors.number} name="number" onChange={handleChange} />}   
           <label htmlFor="name">{placeTag==2? <p style={{color:"red"}}>nom*</p>:"nom"} </label>
           <input type="text" className='form-control' style={placeTag==2?{borderColor:"red"}:{}} value={visitors.name } name="name" onChange={handleChange}/><br />
           <label htmlFor="dayNumber">{placeTag==3? <p style={{color:"red"}}>nombres de jours*</p>:"nombres de jours"}</label>
           <input type="text" className='form-control'style={placeTag==3?{borderColor:"red"}:{}} name="dayNumber" value={visitors.dayNumber} onChange={handleChange}/><br />
           <label htmlFor="tarif">{placeTag==4? <p style={{color:"red"}}>tarifs journaliers*</p>:"tarifs journaliers"}</label>
           <input type="text" className='form-control'style={placeTag==4?{borderColor:"red"}:{}} name="dailyCoast" value={visitors.dailyCoast} onChange={handleChange}/><br />
            <button className="btn btn-success" onClick={handleClick}>enregist..</button>  
        </form>  
    </div>
    


    </>
    
   )
}
export default Modal