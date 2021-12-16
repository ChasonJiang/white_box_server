import { Request, Response, NextFunction } from 'express';
import { CommentCardIndexRequestParams, CommentCardRequestParams, Requester, RequestHead, SubCommentRequestParams, UploadCommentRequestParams } from '../interface/Request';
import { CommentIndexResponse, CommentResponse, PostCardIndexResponse, SubCommentResponse } from '../interface/Response';
import { Comment, SubComment } from '../interface/Comment'
import { Dictionary } from '../class/DataType';
import { UserBaseInfo, UserCard } from '../interface/User';
export {
    CommentIndexList,
    CommentList,
    SubCommentList,
    UploadComment
};

function CommentIndexList(db_pool:any, req:Request, res:Response){
    let _req:Requester<CommentCardIndexRequestParams>= req.body;
    let body:CommentCardIndexRequestParams = _req.body as CommentCardIndexRequestParams;

    
    let sql1_params=[body.pid];
    // console.log(sql1_params);
    let sql1="select cid from post_comment_map where pid = ?;";
    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,sql1_params,(err:any,result:any,fields:any)=>{
            if (err){throw err;}

            if (result.length!=0){
            let cids:string[] = [];
            for(let item of result){
                cids.push(item.cid);
            }
            // console.log(pids);
            let _res:CommentIndexResponse={
                cid:cids
            }
            // console.log(_res);
            res.json(_res);
                
            }else{
                console.log("CommentIndexList 查询结果为空！")
            }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function CommentList(db_pool:any, req:Request, res:Response){
    let _res:Requester<CommentCardRequestParams>= req.body as Requester<CommentCardRequestParams>;
    let head = _res.head as RequestHead;
    let body = _res.body as CommentCardRequestParams;
    let cids:string[] = body.cid;
    let sql1_params:any[]=[cids];
    let sql1:string = "select comment.cid,sub_cid,comment_content,time,user.uid,name,level,avatar from comment left join comment_subcomment_map on comment.cid = comment_subcomment_map.cid left join user on comment.uid = user.uid where comment.cid in ?";

    db_pool.getConnection((err:any,conn:any)=>{
        if(err){throw err;}
        conn.query(sql1,[sql1_params],(err:any,result:any)=>{
            if (err) {
                res.json({
                    success:false,
                    message:"查询评论失败！"
                });
                return conn.rollback(function() {
                    throw err;
                });
            }

            if(result.length!=0){
                let dict:Dictionary<Comment> = new Dictionary<Comment>();
                // console.log(result);
                for(let item of result){
                    if(dict[item.cid]==null || dict[item.cid]== undefined){
                        let cid:string=item.cid;
                        let uid:number = item.uid;
                        let comment_content:string = item.comment_content;
                        let time:string = item.time;
                        // let userCard:UserCard = item.user
                        let userCard:UserCard ={
                            uid:item.uid,
                            userName:item.name,
                            userLevel:item.level,
                            avatarUrl:item.avatar
                        };
                        dict[item.cid]={
                            cid:cid,
                            userCard:userCard,
                            commentContent:comment_content,
                            commentTime:time,
                            sub_cid:[]
                        };
                    }
                    if(item.sub_cid!=null){
                        dict[item.cid].sub_cid.push(item.sub_cid);
                    }
                    // comments.push()
                }
                let _res:CommentResponse={
                    comments:Object.values(dict)
                }
                res.json(_res);
                // console.log(_res);

            }else{
                console.log("CommentList 查询结果为空！")
            }

            
        });
    
    });
}

function SubCommentList(db_pool:any, req:Request, res:Response){
    let _res:Requester<SubCommentRequestParams>= req.body as Requester<SubCommentRequestParams>;
    let head = _res.head as RequestHead;
    let body = _res.body as SubCommentRequestParams;
    let sub_cids:string[] = body.sub_cid;
    let sql1_params:any[]=[sub_cids];
    let sql1:string = "select sub_comment.sub_cid,comment_content,time,userInfo,reply_to from sub_comment where sub_cid in ?";

    db_pool.getConnection((err:any,conn:any)=>{
        if(err){throw err;}
        conn.query(sql1,[sql1_params],(err:any,result:any)=>{
            if (err) {
                res.json({
                    success:false,
                    message:"查询子评论失败！"
                });
                return conn.rollback(function() {
                    throw err;
                });
            }

            if(result.length!=0){
                let subComments:SubComment[]=[];
                // console.log(result);
                for(let item of result){
                        let sub_comment:SubComment={
                            sub_cid:item.sub_cid,
                            userInfo:JSON.parse(item.userInfo),
                            replyTo:JSON.parse(item.reply_to),
                            commentContent:item.comment_content,
                            commentTime:item.time,
                        };
                        subComments.push(sub_comment);
                    // comments.push()
                }
                // console.log(subComments)
                let _res:SubCommentResponse={subComments:subComments};
                res.json(_res);

            }else{
                console.log("SubCommentList 查询结果为空！")
            }

            
        });
    
    });
}

function UploadComment(db_pool:any, req:Request, res:Response){
    let _req:Requester<UploadCommentRequestParams> = req.body as Requester<UploadCommentRequestParams>;
    let head:RequestHead = _req.head as RequestHead;
    let body:UploadCommentRequestParams = _req.body as UploadCommentRequestParams;
    let sql1:string="";
    let sql2:string="";
    let sql3:string="";
    let sql2_params:any[]=[];
    let sql1_params:any[]=[];
    let sql3_params:any[]=[];
    let pid:string =body.pid;

    if(body.sub_cid!=undefined ){
        
        sql1_params=[body.sub_cid,JSON.stringify(body.userInfo),JSON.stringify(body.reply_to),body.content,body.releaseTime];
        sql1="insert into sub_comment (sub_cid,userInfo,reply_to,comment_content,time) values (?,?,?,?,?);";
        sql2_params=[body.cid,body.sub_cid];
        sql2="insert into comment_subcomment_map (cid,sub_cid) values (?,?);";
        sql3_params=[body.sub_cid]
        sql3="delete from sub_comment where sub_cid=? ;";
        // console.log(sql1_params);
    }else{
        sql1_params=[body.cid,head.uid,body.content,body.releaseTime];
        sql1="insert into comment (cid,uid,comment_content,time) values (?,?,?,?);"
        sql2_params=[pid,body.cid];
        sql2="insert into post_comment_map (pid,cid) values (?,?);";
        sql3_params=[body.cid]
        sql3="delete from comment where cid=? ;";

    }


    db_pool.getConnection((err:any,conn:any)=>{
        if(err){throw err;}
        conn.query(sql1,sql1_params,(err:any,result:any)=>{
            if (err) {
                res.json({
                    success:false,
                    message:"插入评论失败！"
                });
                return conn.rollback(function() {
                    throw err;
                });
                }
            conn.query(sql2,sql2_params,(err:any,result:any)=>{
                if (err) {
                    conn.query(sql3,sql3_params,(err:any)=>{if(err){throw err;}});
                    res.json({
                        success:false,
                        message:"插入评论-话题映射表失败！"
                    });
                    return conn.rollback(function() {
                        throw err;
                    });
                    }
                if(result.affectedRows!=0){
                    res.json({
                        success:true,
                    })
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