const express = require('express');
const app = express();
const mysql = require("mysql");
const port = 3001;
const cors= require("cors");
app.use(express.json());

const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
  };
  app.use(cors(corsOptions));

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "gestion_de_visite"
 }
)

app.get('/visitors',(req,res)=>{
    const q = "SELECT * from visitor";
    db.query(q,(err,data) => {
        return res.json(data);
    })
});

app.get('/count',(req,res)=>{
    const q = "SELECT sum(coast) as sumCoast, min(coast) as minCoast,max(coast) as maxCoast from visitor";    
    //validation
    db.query(q,(err,data) => {
        return res.json(data);
    })
    
});



app.post('/createVisitors',(req,res)=>{
//   const id= req.body.id;
  const number= req.body.number;
  const name= req.body.name;
  const dayNumber= req.body.dayNumber;
  const dailyCoast= req.body.dailyCoast;
  const coast=dayNumber*dailyCoast;
  const q = "INSERT into visitor(id,number,name,dayNumber,dailyCoast,coast) VALUES (?,?,?,?,?,?)"
  db.query(q,[null,number,name,dayNumber,dailyCoast,coast],(err,result) =>{
    if(err){
        return res.send(err)
    }
    else{
        return res.send("OK");
    }
  } )
});

app.delete('/delete/:id',(req,res)=>{
    const id= req.params.id;
    const q="delete from visitor where id=?";
    db.query(q,id,(err,data)=>{
    if(err){
        console.log(err);
    }
    else{
        res.send("Ok, delete successfully");
    }
})
}
);

app.put('/update/:id',(req,res)=>{
    const id=req.params.id;
    const number=req.body.number;
    const name=req.body.name;
    const dayNumber=req.body.dayNumber; 
    const dailyCoast=req.body.dailyCoast;
    const coast=dayNumber*dailyCoast;
    const q= "update visitor set number=?,name=?,dayNumber=?,dailyCoast=?,coast=? where id=?";
    
    db.query(q,[number,name,dayNumber,dailyCoast,coast,id],(err,data)=>{
        if(err){
           res.send(err);
        }
        else{
            res.json(data);
        }
    })
})

app.get('/search/:id',(req,res)=>{
  const id = req.params.id;
  const q = "SELECT * from visitor where id=?";
  db.query(q,id,(err,data)=>{
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