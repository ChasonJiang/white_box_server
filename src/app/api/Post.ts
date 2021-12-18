
import { Request, Response, NextFunction } from 'express'
import { PostCardDetailRequestParams, PostCardRequestParams, PostRequestParams, PostSearchRequestParams, Requester, RequestHead, UploadPostRequestParams } from '../interface/Request';
import { PostCardDetailIndexResponse, PostCardDetailResponse, PostCardIndexResponse, PostCardResponse, PostResponse, PostSearchResponse, UploadPostResponse } from '../interface/Response';
import { Post, PostCard, PostCardDetail } from '../interface/Post'
import { Topic } from '../interface/Topic';
import { UserCard } from '../interface/User';
export {
    PostCardIndexList,
    PostCardList,
    PostCardDetailIndexList,
    PostCardDetailList,
    getPost,
    SearchPostCardDetail,
    UploadPost
};

function PostCardIndexList(db_pool:any, req:Request, res:Response){
    let sql1="select * from recommendation;";

    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,(err:any,result:any,fields:any)=>{
             if (result.length!=0){
                let pids:string[] = [];
                for(let item of result){
                    pids.push(item.pid);
                    
                }
                // console.log(pids);
                let _res:PostCardIndexResponse={
                    success: true,
                    pid:pids
                }
                res.json(_res);
                 
             }else{
                let _res:PostCardIndexResponse={
                    success: false,
                    message: "PostCardIndexList 查询失败！"
                }
                res.json(_res);
                 console.log("PostCardIndexList 查询失败！")
             }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function PostCardList(db_pool:any, req:Request, res:Response){
    let _req:Requester<PostCardRequestParams> = req.body as Requester<PostCardRequestParams>;
    let sql1_params=[(_req.body as PostCardRequestParams).pid,];
    let sql1="select pid, uid, topic, title, time, cover, num_comment from post where pid in "+db_pool.escape(sql1_params)+" and is_paper=1 ;";
    // console.log(sql1);
    db_pool.getConnection((err:any,conn:any)=>{
        if(err){throw err;}
        conn.query(sql1,sql1_params,(err:any,result:any,fields:any)=>{
            if(err){throw err;}
            if(result.length!=0){
                let postCards:PostCard[] = [];
                for(let item of result){
                    let postCard:PostCard = {
                        uid: item.uid,
                        pid:item.pid,
                        title:item.title,
                        releaseTime:item.time,
                        coverUrl:item.cover,
                        topic:JSON.parse(item.topic),
                        numberOfComments:item.num_comment
                    };
                    // console.log(postCard);
                    postCards.push(postCard);

                }
                // console.log([(_req.body as PostCardRequestParams).pid,]);
                // console.log(result.length);
                let postCardResponse:PostCardResponse={
                    postCards:postCards
                };
                console.log("PostCardList is running");
                res.json(postCardResponse);
            }else{
                console.log("未查询到此PostCardList："+sql1_params);
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function PostCardDetailIndexList(db_pool:any, req:Request, res:Response){
    let sql1="select * from recommendation;";

    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,(err:any,result:any,fields:any)=>{
             if (result.length!=0){
                let pids:string[] = [];
                for(let item of result){
                    pids.push(item.pid);
                    
                }
                // console.log(pids);
                let _res:PostCardDetailIndexResponse={
                    success:true,
                    pid:pids
                }
                res.json(_res);
                 
             }else{
                let _res:PostCardDetailIndexResponse={
                    success:false,
                    message:"未查询到此PostCardDetailIndexList"
                }
                res.json(_res);
                console.log("未查询到此PostCardDetailIndexList");
             }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function PostCardDetailList(db_pool:any, req:Request, res:Response){
    let _req:Requester<PostCardDetailRequestParams> = req.body as Requester<PostCardDetailRequestParams>;
    let sql1="select * from post left join user on post.uid = user.uid where pid in (?) and is_paper=1 ;";
    let sql1_params=[(_req.body as PostCardDetailRequestParams).pid,];
    // console.log(sql1_params);
    db_pool.getConnection((err:any,conn:any)=>{
        if(err){throw err;}
        conn.query(sql1,sql1_params,(err:any,result:any,fields:any)=>{
            if(err){throw err;}
            if(result.length!=0){
                let data:{postCardsDetail:PostCardDetail,userCard:UserCard}[] = [];
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
                    if(item.is_paper){
                        post.coverUrl=item.cover;
                        post.title=item.title;
                    }
                    let userCard:UserCard ={
                        uid:item.uid,
                        userName:item.name,
                        userLevel:item.level,
                        avatarUrl:item.avatar
                    };
                    data.push({
                        postCardsDetail:post,
                        userCard:userCard
                    });
                }
                let _res:PostCardDetailResponse={
                    data:data
                };
                res.json(_res);
                // console.log("PostCardList is running");
                // res.json(postCardResponse);
            }else{
                console.log("未查询到此PostCardDetail！"+sql1_params);
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function getPost(db_pool:any, req:Request, res:Response){
    // console.log("get post");
    // res.json({
    //     post:POST,
    //     userCard:USER_CARD_INFO,
    // });

    let _req:Requester<PostRequestParams> =req.body;
    let body:PostRequestParams=_req.body as PostRequestParams;
    let pid:string = body.pid;
    let sql1:string = "select * from post left join user on post.uid=user.uid where pid = ?";
    let sql1_params=[pid];

    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,sql1_params,(err:any,result:any,fields:any)=>{
            if (err){throw err;}
            if(result.length!=0){
                let post:Post={
                    uid:result[0].uid,
                    pid:result[0].pid,
                    topic:JSON.parse(result[0].topic),
                    content:result[0].post_content,
                    isPaper:result[0].is_paper,
                    releaseTime:result[0].time,
                    numberOfApproval:result[0].num_approval,
                    numberOfComments:result[0].num_comment
                };
                if(result[0].is_paper){
                    post.coverUrl=result[0].cover;
                    post.title=result[0].title;
                }
                let userCard:UserCard ={
                    uid:result[0].uid,
                    userName:result[0].name,
                    userLevel:result[0].level,
                    avatarUrl:result[0].avatar
                };
                let _res:PostResponse={
                    post:post,
                    userCard:userCard
                };
                res.json(_res);
            }else{
                console.log("未找到该帖子！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });

    });

}
    
function SearchPostCardDetail(db_pool:any, req:Request, res:Response){
    let _req: Requester<PostSearchRequestParams> = req.body as Requester<PostSearchRequestParams>;
    let content = _req.body.content as string;
    let sql1 = 'select pid from post where post_content REGEXP (?) or title REGEXP (?) ;';
    let sql1_params=[content,content];
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, sql1_params, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                let pids: string[] = [];
                for (let item of result) {
                    pids.push(item.pid);
                }
                let _res: PostSearchResponse = {
                    success: true,
                    pid:pids
                };
                console.log("SearchPostCardDetail Success!");
                res.json(_res);
            } else {
                console.log("searchsimplegamelist 查询错误！");
            }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function UploadPost(db_pool:any, req:Request, res:Response){
    let _req:Requester<UploadPostRequestParams> =req.body;
    let head=_req.head as RequestHead;
    let body:UploadPostRequestParams=_req.body as UploadPostRequestParams;
    let uid:string = head.uid as string;
    let post:Post = body.post;
    let pid_tid:any=[];
    for(let item of post.topic){
        pid_tid.push([post.pid,item.tid]);
    }
    // console.log(post);
    
    let sql1_params=[post.pid,uid,JSON.stringify(post.topic),post.content,post.releaseTime,post.isPaper,0,0];
    if(post.isPaper){
        sql1_params.push(post.coverUrl as string);
        sql1_params.push(post.title as string);
    }else{
        sql1_params.push('');
        sql1_params.push('');
    }

    console.log(db_pool.escape(pid_tid));
    let sql1="insert into post (pid,uid,topic,post_content,time,is_paper,num_approval,num_comment,cover,title) values (?,?,?,?,?,?,?,?,?,?);";
    
    let sql2="insert into post_topic_map (pid,tid) values "+db_pool.escape(pid_tid)+" ;";

    let sql3_params=[post.pid];
    let sql3="delete from post where pid = ?";


    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,sql1_params,(err:any,result:any,fields:any)=>{
            if (err) {
                res.json({
                    success: false,
                    message: "插入post表失败！"
                });
                // return conn.rollback(function() {
                    throw err;
                // });
                }
            conn.query(sql2,(err:any,result:any,fields:any)=>{
                if (err) {
                    conn.query(sql3,sql3_params,(err:any)=>{if (err) {throw err;}});
                    res.json({
                        success: false,
                        message: "插入post_topic_map失败！"
                    });
                    // return conn.rollback(function() {
                        throw err;
                    // });
                    }
                res.json({
                    success: true,
                }as UploadPostResponse);
            });

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });

}

