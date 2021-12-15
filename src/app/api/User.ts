import { Request, Response, NextFunction } from 'express'
import { LoginResponse } from '../interface/Response';
import { UserInfo } from '../interface/User';
// import { COMMENT,BASE_COMMENT } from '../comment';
// import { LoginResponse } from '../interface/Response';
// import { UserInfo } from '../interface/User';
import { POST } from '../post';
import { POST_CARD } from '../postcard';
// import { TOPIC_CARD } from '../TopicCard';
import { USER_CARD_INFO } from '../user';

export{
    SignUp,
    LogIn,
    LogOut

};

function SignUp(db_pool:any, req:Request, res:Response){

}
function LogIn(db_pool:any, req:Request, res:Response){
    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        let uid:number=req.body.head.uid;
        let pwd:string=req.body.body.pwd;

        conn.query("select * from account where uid=? and pwd=?",[uid,pwd],(err:any,result:any,fields:any)=>{
            if(!(result[0]===undefined)){
                conn.query("select * from user where uid=?",uid,(err:any,result:any,fields:any)=>{
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
                });
            }else{
                res.json({
                    success: false,
                    message:"账号或密码错误！"
                });
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    
    });

}
function LogOut(db_pool:any, req:Request, res:Response){

}