import express, { Application, Request, Response, NextFunction } from 'express'
import {TYPE} from './api/main';


const app = express();
const port = 3500;
const cors=require("cors");
const mysql = require("mysql");
const db_pool=mysql.createPool({
    host     : '106.52.148.60',
    user     : 'white_box',
    password : 'Project@white_box_410',
    database : 'white_box',
    connectionLimit : 100,
});
// const db = mysql.createConnection({
//     host     : '106.52.148.60',
//     user     : 'white_box',
//     password : 'Project@white_box_410',
//     database : 'white_box',

//   });
  
app.use(express.json({'limit':'100mb'}));
app.use(express.urlencoded({extended:false}));
app.use(cors()); 

app.post('/api',(req:Request, res:Response,next:NextFunction) =>main(req,res,next));

function main(req:Request, res:Response, next:NextFunction){
    
    let body=req.body;
    try{
        TYPE[body.head.type](db_pool,req,res);

    }catch(err){
        res.send("未知类型！");
    }finally{
        // next();
    }

    // return;
}


app.listen(port,()=>{
    console.log(`white box server listening at http://localhost:${port}`)
});
