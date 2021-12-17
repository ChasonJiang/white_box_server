import { Request, Response, NextFunction } from 'express'
import { RegisterRequestParams, Requester } from '../interface/Request';
import { LoginResponse } from '../interface/Response';
import { UserInfo } from '../interface/User';


export{
    SignUp,
    LogIn,
    LogOut

};

function SignUp(db_pool:any, req:Request, res:Response){

    let _req:Requester<RegisterRequestParams> = req.body as Requester<RegisterRequestParams>;
    let body = _req.body as RegisterRequestParams;
    let sql1_params=[body.phone,body.pwd];
    let sql1:string = "insert into account (uid,pwd) values (?,?);";
    let sql2_params=[body.phone,body.userName,body.avatarUrl,body.birthDay];
    let sql2:string = "insert into user (uid,name,avatar,birth_day) values (?,?,?,?);";
    db_pool.getConnection((err: any, conn: any) => {
        if (err){throw err;}
        conn.beginTransaction(function(err: any) {
            if (err) { throw err; }
            conn.query(sql1, sql1_params, function (err: any, result: any, fields: any) {
                if (err) {
                    return conn.rollback(function() {
                    throw err;
                    });
                }
            
                conn.query(sql2, sql2_params, function (err: any, result: any, fields: any) {
                    if (err) {
                    return conn.rollback(function() {
                        throw err;
                    });
                    }

                    conn.commit(function(err: any) {
                    if (err) {
                        res.json({
                            success: false,
                            message: "注册失败！"
                        });
                        return conn.rollback(function() {
                        throw err;
                        });
                    }
                    console.log('注册成功!');
                    });

                });
            });
        });
    });
    
}


function LogIn(db_pool:any, req:Request, res:Response){
    db_pool.getconn((err:any,conn:any)=>{
        if (err){throw err;}
        let uid:number=req.body.head.uid;
        let pwd:string=req.body.body.pwd;
        
        conn.query("select * from account where uid=? and pwd=?",[uid,pwd],(err:any,result:any,fields:any)=>{
            if (err) { 
                res.json({
                    success: false,
                    message:"登录出错！"
                });
                throw err; 
            }
            if(!(result[0]==undefined || result[0]==null || result[0]=='')){
                conn.query("select * from user where uid=?",uid,(err:any,result:any,fields:any)=>{
                    if (err) {
                        res.json({
                            success: false,
                            message:"登录出错！"
                        }); 
                        throw err; 
                    }
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
            // When done with the conn, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the conn here, it has been returned to the pool.
        });
    
    });

}
function LogOut(db_pool:any, req:Request, res:Response){

}