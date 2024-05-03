const express = require('express');
const app = express();
const mysql = require("mysql");
const port = 3001;
//  const cors= require("cors");
//  app.use(cors());
 app.use(express.json());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "expressDB"
 }
)

 app.get('/users',(req,res)=>{
    const q = "SELECT * from users";
     db.query(q,(err,data) => {
         return res.json(data);
     })
 });

app.post('/teHahazo',(req,res)=>{
 const matricule= req.body.matricule;
 const nom= req.body.nom;
 const prenom= req.body.prenom;
 const contact= req.body.contact;
 const q = "INSERT into users(matricule,nom,prenom,contact) VALUES (?,?,?,?)"
   db.query(q,[matricule,nom,prenom,contact],(err,result) =>{
    if(err){
        console.log(err);
    }
    else{
        return res.send("OK");
    }
 } )
 });

 app.delete('/delete/:id',(req,res)=>{
    const matricule= req.params.id;
    const q="delete from users where matricule=?";
   db.query(q,matricule,(err,data)=>{
   if(err){
       console.log(err);
   }
   else{
     res.send("Ok, delete successfully");
   }
})
}
);

 app.put('/update/:matricule',(req,res)=>{
 const matricule=req.params.matricule;
 const nom=req.body.nom;
 const prenom=req.body.prenom;
 const contact=req.body.contact; 

 //const values =[req.body.nom,req.body.prenom,req.body.contact];
 //const matricule = req.params.matricule;

const q= "update users set nom=?,prenom=?,contact=? where matricule=?"
 //db.query(q,[...values,matricule],(err,data))
   db.query(q,[nom,prenom,contact,matricule],(err,data)=>{
        if(err){
           res.send(err);
       }
       else{
          res.json(data);
      }
  })
})

app.get('/search/:matricule',(req,res)=>{
 const matricule = req.params.matricule;
 const q = "SELECT * from users where matricule=?";
 db.query(q,matricule,(err,data)=>{
    if(err){
       console.log (err);
     }
     else{
        res.json(data);
     }
  })
})

app.listen(port,()=>{
    console.log("listening")
})