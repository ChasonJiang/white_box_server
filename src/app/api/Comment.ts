import { Request, Response, NextFunction } from 'express';
import { Requester, RequestHead, UploadCommentRequestParams } from '../interface/Request';

export {
    CommentIndexList,
    CommentList,
    SubCommentList,
    UploadComment
};

function CommentIndexList(db_pool:any, req:Request, res:Response){
    let sql1="select * from recommendation;";

    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,(err:any,result:any,fields:any)=>{
            if (err){throw err;}

            if (result.length!=0){
            let pids:number[] = [];
            for(let item of result){
                pids.push(item.pid);
                
            }
            // console.log(pids);
            let _res={
                pid:pids
            }
            res.json(_res);
                
            }else{
                console.log("PostCardDetailIndexList 查询失败！")
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
    res.json({
        // comments:COMMENT
    })
}

function SubCommentList(db_pool:any, req:Request, res:Response){
    res.json({
        // subComments:[BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT]
    })
}

function UploadComment(db_pool:any, req:Request, res:Response){
    let _req:Requester<UploadCommentRequestParams> = req.body as Requester<UploadCommentRequestParams>;
    let head:RequestHead = _req.head as RequestHead;
    let body:UploadCommentRequestParams = _req.body as UploadCommentRequestParams;
    let sql1:string="";
    let sql1_params:any[]=[];
    let pid:string =body.pid;
    sql1_params.push(pid);
    if(body.cid!=undefined && body.cid==undefined){
        sql1_params.push(body.cid);
        sql1_params.push(0);
        sql1_params.push(head.uid);
        sql1_params.push(body.reply_to);
        sql1="insert into sub_comment (pid,cid,sub_cid,uid,reply_to,comment_content) values (?,?,?,?,?,?);";
    }else if(body.cid!=undefined && body.sub_cid!=undefined){
        sql1_params.push(body.cid);
        sql1_params.push(body.sub_cid);
        sql1_params.push(head.uid);
        sql1_params.push(body.reply_to);
        sql1="insert into sub_comment (pid,cid,sub_cid,uid,reply_to,comment_content) values (?,?,?,?,?,?);";
    }else{
        sql1_params.push(0);
        sql1_params.push(head.uid);
        sql1="insert into comment (pid,cid,uid,comment_content) values (?,?,?,?,?);"
    }
    sql1_params.push(body.content);

    db_pool.getConnection((err:any,conn:any)=>{
        if(err){throw err;}
        conn.query(sql1,sql1_params,(err:any,result:any)=>{
            if(err){throw err;}

            if(result.insertId){
                
            }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })

    
    

}