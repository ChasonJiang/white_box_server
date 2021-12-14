import express, { Application, Request, Response, NextFunction } from 'express'
import { COMMENT,BASE_COMMENT } from './comment';
import { LoginResponse } from './interface/Response';
import { UserInfo } from './interface/User';
import { POST } from './post';
import { POST_CARD } from './postcard';
import { TOPIC_CARD } from './TopicCard';
import { USER_CARD_INFO } from './user';

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
const db = mysql.createConnection({
    host     : '106.52.148.60',
    user     : 'white_box',
    password : 'Project@white_box_410',
    database : 'white_box',

  });
  


// let db_conn=db.connect(function(err: any) {
//     if (err) {
//       console.error('error connecting: ' + err.stack);
//       return;
//     }
  
//     console.log('connected as id ' + db_conn.threadId);
//   });
app.use(express.json({'limit':'100mb'}));
app.use(express.urlencoded({extended:false}));
app.use(cors()); 


const TYPE:{[key:string]:Function} ={
    'GetPostCardList':PostCardList,
    'GetPostCardIndexList':PostCardIndexList,
    'GetPostCardDetailIndexList':PostCardDetailIndexList,
    'GetPostCardDetailList':PostCardDetailList,
    'GetPost':Post,
    'GetTopicCardIndexList':TopicCardIndexList,
    'SearchTopicCardList':SearchTopicCardList,
    'GetTopicCardList':TopicCardList,
    'SearchPostCardDetail':SearchPostCardDetail,
    'GetCommentIndexList':CommentIndexList,
    'GetCommentList':CommentList,
    'GetSubCommentList':SubCommentList,
    'UploadPost':UploadPost,
    'SignUp':SignUp,
    'LogIn':LogIn,
    'LogOut':LogOut
};

app.post('/api',(req:Request, res:Response,next:NextFunction) =>main(req,res,next));

function main(req:Request, res:Response, next:NextFunction){
    
    let body=req.body;
    try{
        TYPE[body.head.type](req,res);

    }catch(err){
        res.send("未知类型！");
    }finally{
        // next();
    }

    // return;
}

// db_pool.createConnection();

// db.query("select * from account;",(err:any,result:any,fields:any)=>{
//     if(err){throw err;}
//     console.log(result[0]);
// })

// db_pool.getConnection((err:any,conn:any)=>{
//     if (err){throw err;}

//     conn.query("select * from account;",(err:any,result:any,fields:any)=>{
//         if(err){throw err;}
//         console.log(result[0]);
//         // console.log(fields);
//         // When done with the connection, release it.
//         conn.release();
//         // Handle error after the release.
//         if (err) throw err;
//         // Don't use the connection here, it has been returned to the pool.
//     });

// });

function PostCardIndexList(req:Request, res:Response){
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function PostCardList(req:Request, res:Response){
    res.json({
        postCards:POST_CARD
    });
}

function PostCardDetailIndexList(req:Request, res:Response){
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function PostCardDetailList(req:Request, res:Response){
    res.json({
        postCardsDetail:[POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST]
    });
}

function Post(req:Request, res:Response){
    console.log("get post");
    res.json({
        post:POST,
        userCard:USER_CARD_INFO,
    });
}

function TopicCardIndexList(req:Request, res:Response){
    res.json({
        tid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function SearchTopicCardList(req:Request, res:Response){
    res.json({
        tid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function TopicCardList(req:Request, res:Response){
    res.json({
        topicCards:TOPIC_CARD,
    })
}

function SearchPostCardDetail(req:Request, res:Response){
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function CommentIndexList(req:Request, res:Response){
    res.json({
        cid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function CommentList(req:Request, res:Response){
    res.json({
        comments:COMMENT
    })
}

function SubCommentList(req:Request, res:Response){
    res.json({
        subComments:[BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT]
    })
}
function UploadPost(req:Request, res:Response){
    console.log(req.body.body.post);
    res.json({
        success:true,
    })
}

function SignUp(req:Request, res:Response){

}
function LogIn(req:Request, res:Response){


    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        // let body = req.body.body;
        // console.log(req.body.body.pwd);
        conn.query("select * from account where uid=? and pwd=?",[req.body.head.uid,req.body.body.pwd],(err:any,result:any,fields:any)=>{
            if(err){throw err;}
            // console.log(result[0])
            if(!(result[0]===undefined)){
                conn.query("select * from user where uid=?",req.body.head.uid,(err:any,result:any,fields:any)=>{
                    // if(err){throw err;}
                    // console.log(result);
                    let _res:LoginResponse={
                        success: true,
                        userInfo:{
                            uid:result[0].uid,
                            userName:result[0].name,
                            avatarUrl:result[0].avatar,
                            userLevel:result[0].level,
                        }as UserInfo
                    };
                    res.json(_res);
                })
                // conn.release();
                // // Handle error after the release.
                // if (err) throw err;
            }else{
                res.json({
                    success: false,
                    message:"账号或密码错误！"
                });
            }
            // console.log(fields);
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    
    });

}
function LogOut(req:Request, res:Response){

}

app.listen(port,()=>{
    console.log(`white box server listening at http://localhost:${port}`)
});
