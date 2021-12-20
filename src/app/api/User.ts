import { Request, Response, NextFunction } from 'express'
import {sha256} from '../util/util'
import { EditUserInfoRequestParams, MomentIndexRequestParams, MomentRequestParams, PostCardDetailRequestParams, RegisterRequestParams, Requester, RequestHead } from '../interface/Request';
import { EditUserResponse, LoginResponse, MomentIndexResponse, MomentResponse, PostCardDetailResponse, RegisterResponse } from '../interface/Response';
import { UserCard, UserInfo } from '../interface/User';
import { PostCardDetail } from '../interface/Post';

const AVATAR:string="data:image/png;base64,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";

export{
    SignUp,
    LogIn,
    LogOut,
    EditerUserInfo,
    DestroyAccount,
    LoginValidation,
    GetMoments,
    GetMomentIndexList
};

function SignUp(db_pool:any, req:Request, res:Response){

    let _req:Requester<RegisterRequestParams> = req.body as Requester<RegisterRequestParams>;
    let body = _req.body as RegisterRequestParams;
    let sql1_params=[body.phone,body.pwd];
    let sql1:string = "insert into account (uid,pwd) values (?,?);";
    let sql2_params=[body.phone];
    let sql2:string = "select * from account where uid = ?;";
    let time:string = new Date().getTime().toString();
    let sql3_params=[body.phone,body.phone,0,AVATAR,time];
    let sql3="insert into user (uid,name,level,avatar,birth_day) values (?,?,?,?,?);";
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
                conn.beginTransaction(function(err: any) {
                    if (err) { throw err; }
                    conn.query(sql1, sql1_params, function (err: any, result: any, fields: any) {
                        if (err) {
                            let _res:RegisterResponse={
                                success:false,
                                message:"注册失败!"
                            }
                            res.json(_res);
                            return conn.rollback(function() {
                              throw err;
                            });
                          }
                        conn.query(sql3, sql3_params, function (err: any, result: any, fields: any) {
                            if (err) {
                                let _res:RegisterResponse={
                                    success:false,
                                    message:"注册失败!"
                                }
                                res.json(_res);
                                return conn.rollback(function() {
                                    throw err;
                                });
                            }
                            conn.commit(function(err: any) {
                                if (err) {
                                    let _res:RegisterResponse={
                                        success:false,
                                        message:"注册失败!"
                                    }
                                    res.json(_res);
                                return conn.rollback(function() {
                                    throw err;
                                });
                                }
                                let _res:RegisterResponse={
                                    success:true,
                                }
                                res.json(_res);
                                console.log('注册成功!');
                            });
                        });
                    });
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
    let uid:string=req.body.body.uid;
    let pwd:string=req.body.body.pwd;


    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}

        conn.query("select * from account where uid=? and pwd=?",[uid,pwd],(err:any,result:any,fields:any)=>{
            if (err) { 
                res.json({
                    success: false,
                    message:"登录出错！"
                });
                throw err; 
            }
            // console.log([uid,pwd])
            // console.log(result);
            if(!(result[0]==undefined || result[0]==null || result[0]=='')){
                conn.query("select * from user where uid=?",uid,(err:any,result:any,fields:any)=>{
                    if (err) {
                        res.json({
                            success: false,
                            message:"登录出错！"
                        }); 
                        throw err; 
                    }
                    // console.log(result);
                    if(result.length!=0){
                        let nowTime = new Date().getTime().toString();
                        let token:string=sha256(uid+nowTime);
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
                        conn.query("update account set token = ? where uid = ?",[token,uid],(err:any,result:any,fields:any)=>{
                            if (err) {
                                res.json({
                                    success: false,
                                    message:"登录出错,获取token失败！"
                                }); 
                                throw err; 
                            }
                            if(result.affectedRows!=0){
                                res.json(_res);
                                console.log("登录成功！");
                                console.log(token);
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
    let uid:string=req.body.body.uid;
    // let pwd:string=req.body.body.pwd;
    let token:string=req.body.body.token;
    // console.log(uid, token);
    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}

        conn.query("select * from account where uid=? and token=? ;",[uid,token],(err:any,result:any,fields:any)=>{
            if (err) { 
                res.json({
                    success: false,
                    message:"登出失败！"
                });
                throw err; 
            }
            // console.log([uid,pwd])
            // console.log(result);
            if(!(result[0]==undefined || result[0]==null || result[0]=='')){
                conn.query("update account set token = ? where uid=?",[null,uid],(err:any,result:any,fields:any)=>{
                    if (err) {
                        res.json({
                            success: false,
                            message:"登出失败！"
                        });
                        throw err; 
                    }
                    if(result.affectedRows!=0){
                        res.json({
                            success:true,
                            message:"登出成功！"
                        });
                        console.log("登出成功！");

                    }else{
                        res.json({
                            success: false,
                            message:"登出失败！"
                        });
                    }
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

function DestroyAccount(db_pool:any, req:Request, res:Response){
    let uid:string=req.body.body.uid;
    let pwd:string=req.body.body.pwd;
    let token:string=req.body.body.token;
    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}

        conn.query("select * from account where uid=? and pwd=? and token=? ;",[uid,pwd,token],(err:any,result:any,fields:any)=>{
            if (err) { 
                res.json({
                    success: false,
                    message:"销毁账户失败！"
                });
                throw err; 
            }
            // console.log([uid,pwd])
            // console.log(result);
            if(!(result[0]==undefined || result[0]==null || result[0]=='')){
                conn.query("delete from account where uid=?",[uid],(err:any,result:any,fields:any)=>{
                    if (err) {
                        res.json({
                            success: false,
                            message:"销毁账户失败！"
                        });
                        throw err; 
                    }
                    if(result.affectedRows!=0){
                        res.json({
                            success:true,
                            message:"销毁账户成功！"
                        });
                        console.log("销毁账户成功！");

                    }else{
                        res.json({
                            success: false,
                            message:"销毁账户失败！"
                        });
                    }
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

function LoginValidation(db_pool:any, req:Request, res:Response){
    let uid:string=req.body.body.uid;
    let token:string=req.body.body.token;
    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}

        conn.query("select * from account where uid=? ;",[uid],(err:any,result:any,fields:any)=>{
            if (err) { 
                res.json({
                    success: false,
                    message:"验证失败！"
                });
                throw err; 
            }
            if(!(result[0]==undefined || result[0]==null || result[0]=='')){
                if(result[0].token==token){
                    res.json({
                        success: true,
                        message:"该账户已登录"
                    });
                }else{
                    res.json({
                        success: false,
                        message:"该账户已在其他设备登录"
                    });
                }

            }else{
                res.json({
                    success: false,
                    message:"该账户未登录"
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

// function GetMoments(db_pool:any, req:Request, res:Response){
//     let _req:Requester<MomentRequestParams> = req.body as Requester<MomentRequestParams>;
//     let sql1="select * from post where uid = ? ;";
//     let sql1_params=[(_req.body as MomentRequestParams).uid,];
//     // console.log(sql1_params);
//     db_pool.getConnection((err:any,conn:any)=>{
//         if(err){throw err;}
//         conn.query(sql1,sql1_params,(err:any,result:any,fields:any)=>{
//             if(err){throw err;}
//             if(result.length!=0){
//                 let postCardsDetail:PostCardDetail[] = [];
//                 for(let item of result){
//                     let post:PostCardDetail={
//                         uid:item.uid,
//                         pid:item.pid,
//                         topic:JSON.parse(item.topic),
//                         content:item.post_content,
//                         isPaper:item.is_paper,
//                         releaseTime:item.time,
//                         numberOfApproval:item.num_approval,
//                         numberOfComments:item.num_comment
//                     };
//                     postCardsDetail.push(post);
//                 }
//                 let _res:MomentResponse={
//                     postCardsDetail:postCardsDetail
//                 };
//                 res.json(_res);
//                 // console.log("PostCardList is running");
//                 // res.json(postCardResponse);
//             }else{
//                 console.log("未查询uid:",(_req.body as MomentRequestParams).uid,"的Moments");
//             }

//             // When done with the connection, release it.
//             conn.release();
//             // Handle error after the release.
//             if (err) throw err;
//             // Don't use the connection here, it has been returned to the pool.
//         });
//     });
// }

function GetMomentIndexList(db_pool:any, req:Request, res:Response){
    let _req = req.body.body as MomentIndexRequestParams;
    let sql1="select pid from post where uid = ?;";
    let sql1_params =[_req.uid];
    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,sql1_params,(err:any,result:any,fields:any)=>{
             if (result.length!=0){
                let pids:string[] = [];
                for(let item of result){
                    pids.push(item.pid);
                }
                // console.log(pids);
                let _res:MomentIndexResponse={
                    success:true,
                    pid:pids
                }
                res.json(_res);
                 
             }else{
                let _res:MomentIndexResponse={
                    success:false,
                    message:"未查询到此MomentIndexList"
                }
                res.json(_res);
                console.log("未查询到此MomentIndexList");
             }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function GetMoments(db_pool:any, req:Request, res:Response){
    let _req:Requester<MomentRequestParams> = req.body as Requester<MomentRequestParams>;
    let sql1_params=[[(_req.body as MomentRequestParams).pid]];
    let sql1="select * from post where pid in ?;";

    // console.log(sql1_params);
    // console.log(sql1_params);
    db_pool.getConnection((err:any,conn:any)=>{
        if(err){throw err;}
        // console.log(111)
        conn.query(sql1,sql1_params,(err:any,result:any,fields:any)=>{
            if(err){throw err;}
            // console.log(111)
            // console.log(result)
            let postCardsDetail:PostCardDetail[] = [];
            if(result.length!=0){
                for(let item of result){
                    let post:PostCardDetail={
                        uid:item.uid,
                        pid:item.pid,
                        topic:JSON.parse(item.topic),
                        content:item.post_content,
                        isPaper:item.is_paper,
                        releaseTime:item.time,
                        numberOfApproval:item.num_approval,
                        numberOfComments:item.num_comment
                    };
                    // console.log(item.post_content)
                    if(item.is_paper){
                        post.coverUrl=item.cover;
                        post.title=item.title;
                    }
                    postCardsDetail.push(post);
                }
                
            }
            conn.query("select * from user where uid=?",(_req.body as MomentRequestParams).uid,(err:any,result:any,fields:any)=>{
                if (err) {
                    res.json({
                        success: false,
                        message:"动态获取失败，查询用户信息出错！"
                    }); 
                    throw err; 
                }
                // console.log(result);
                if(result.length!=0){
                    let _res:MomentResponse={
                        postCardsDetail:postCardsDetail,
                        userInfo:{
                            uid:result[0].uid,
                            userName:result[0].name,
                            avatarUrl:result[0].avatar,
                            userLevel:result[0].level,
                            numberOfFans:result[0].num_fans,
                            numberOfFollow:result[0].num_follow,
                        }as UserInfo
                    };
                    res.json(_res);
                }else{

                }
            });

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}