import { Request, Response, NextFunction } from 'express'
import {sha256} from '../util/util'
import { EditUserInfoRequestParams, RegisterRequestParams, Requester, RequestHead } from '../interface/Request';
import { EditUserResponse, LoginResponse, RegisterResponse } from '../interface/Response';
import { UserInfo } from '../interface/User';


export{
    SignUp,
    LogIn,
    LogOut,
    EditerUserInfo

};

function SignUp(db_pool:any, req:Request, res:Response){

    let _req:Requester<RegisterRequestParams> = req.body as Requester<RegisterRequestParams>;
    let body = _req.body as RegisterRequestParams;
    let sql1_params=[body.phone,body.pwd];
    let sql1:string = "insert into account (uid,pwd) values (?,?);";
    let sql2_params=[body.phone];
    let sql2:string = "select * from account where uid = ?;";
    db_pool.getConnection((err: any, conn: any) => {
        if (err){throw err;}

        conn.query(sql2, sql2_params, function (err: any, result: any, fields: any) {
            if (err) {
                let _res:RegisterResponse={
                    success:false,
                    message:"注册失败!"
                }
                res.json(_res);
                throw err;
            }
            if (result.length==0){
                conn.query(sql1, sql1_params, function (err: any, result: any, fields: any) {
                    if (err) {
                        let _res:RegisterResponse={
                            success:false,
                            message:"注册失败!"
                        }
                        res.json(_res);
                        throw err;
                    }
                    if (result.affectedRows!=0){
                        let _res:RegisterResponse={
                            success:true,
                        }
                        res.json(_res);
                        console.log('注册成功!');
                    }
        
                });
            }else{
                let _res:RegisterResponse={
                    success:false,
                    message:"该账户已存在!"
                }
                res.json(_res);
            }

            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
        
    });
    
}

function EditerUserInfo(db_pool:any, req:Request, res:Response){
    let _req:Requester<EditUserInfoRequestParams> = req.body as Requester<EditUserInfoRequestParams>;
    let head:RequestHead = _req.head as RequestHead;
    let body = _req.body as EditUserInfoRequestParams;
    let sql1_params=[body.uid,body.pwd];
    let sql1:string = "selct pwd from account uid = ? ;";
    let sql2_params=[body.uid,body.userName,body.avatarUrl,body.birthDay];
    let sql2:string = "update user ";

    if(body.sex != null ||body.sex != undefined){
        sql2+="set sex = ?,";
        sql2_params.push(body.sex);
    }
    if(body.birthDay != null ||body.birthDay != undefined){
        sql2+="set birth_day = ?,";
        sql2_params.push(body.birthDay);
    }
    if(body.signature != null ||body.signature != undefined){
        sql2+="set signature = ?,";
        sql2_params.push(body.signature);
    }
    if(body.avatarUrl != null ||body.avatarUrl != undefined){
        sql2+="set avatar = ?,";
        sql2_params.push(body.avatarUrl);
    }
    if(body.email != null ||body.email != undefined){
        sql2+="set email = ?,";
        sql2_params.push(body.email);
    }
    if(body.userName != null ||body.userName != undefined){
        sql2+="set username = ?,";
        sql2_params.push(body.userName );
    }
    sql2+="where uid =?";
    sql2_params.push(head.uid);



    db_pool.getConnection((err: any, conn: any) => {
        if (err){throw err;}
        conn.query(sql1, sql1_params, function (err: any, result: any, fields: any) {
            if (err) {
                throw err;
            }
            if(result.affectedRows == 1 && result[0].pwd == body.pwd){
                conn.query(sql2, sql2_params, function (err: any, result: any, fields: any) {
                    if (err) {
                            throw err;
                        }
                        if(result.affectedRows!=0){
                            let _res:EditUserResponse ={
                                success: true,
                            }
                            res.json(_res);
                            console.log('用户信息添加成功!');
                        }else{
                            let _res:EditUserResponse ={
                                success: false,
                                message:"修改用户信息失败！"
                            }
                            res.json(_res);
                        }
                });
            }
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}


function LogIn(db_pool:any, req:Request, res:Response){
    db_pool.getconn((err:any,conn:any)=>{
        if (err){throw err;}
        let uid:string=req.body.body.uid;
        let pwd:string=req.body.body.pwd;
        let nowTime = new Date().getTime.toString();
        let token:string=sha256(uid+nowTime+"white_box_server");
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
                    if(result.length!=0){
                        let _res:LoginResponse={
                            success: true,
                            token:token,
                            userInfo:{
                                uid:result[0].uid,
                                userName:result[0].name,
                                avatarUrl:result[0].avatar,
                                userLevel:result[0].level,
                            }as UserInfo
                        };
                        conn.query("update account set token = ?",token,(err:any,result:any,fields:any)=>{
                            if (err) {
                                res.json({
                                    success: false,
                                    message:"登录出错,获取token失败！"
                                }); 
                                throw err; 
                            }
                            if(result.affectedRows!=0){
                                res.json(_res);
                            }else{
                                res.json({
                                    success: false,
                                    message:"登录出错,获取token失败！"
                                }); 
                            }
                        });
                    }
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