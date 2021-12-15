
import { Request, Response, NextFunction } from 'express'
import { PostCardRequestParams, PostRequestParams, Requester, RequestHead, UploadPostRequestParams } from '../interface/Request';
import { PostCardIndexResponse, PostCardResponse, PostResponse, UploadPostResponse } from '../interface/Response';
import { POST } from '../post';
import { POST_CARD } from '../postcard';
import { USER_CARD_INFO } from '../user';
import { Post, PostCard } from '../interface/Post'
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
                let pids:number[] = [];
                for(let item of result){
                    pids.push(item.pid);
                    
                }
                // console.log(pids);
                let _res:PostCardIndexResponse={
                    pid:pids
                }
                res.json(_res);
                 
             }else{
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
    let sql1="select pid, uid, title, topic, time, cover, num_comment from post where pid in (?) and is_paper=1 ;";
    let sql1_params=[(_req.body as PostCardRequestParams).pid,];
    // console.log(sql1_params);
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
                    postCards.push(postCard);
                }
                let postCardResponse:PostCardResponse={
                    postCards:postCards
                };
                console.log("PostCardList is running");
                res.json(postCardResponse);
            }else{
                console.log("PostCardList 查询错误！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}

function PostCardDetailIndexList(db_pool:any, req:Request, res:Response){
    res.json({
        pid:[1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function PostCardDetailList(db_pool:any, req:Request, res:Response){
    res.json({
        postCardsDetail:[POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST]
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
    let pid:number = body.pid;
    let sql1:string = "select * from post where pid = ?";
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
                let sql2="select * from user where uid=?";
                let sql2_params = result[0].uid;
                conn.query(sql2,sql2_params,(err:any,result:any,fields:any)=>{
                    if(result.length!=0){
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
                        console.log("用户查询出错！");
                    }

                });

            }else{
                console.log("帖子查询出错！");
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
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function UploadPost(db_pool:any, req:Request, res:Response){
    let _req:Requester<UploadPostRequestParams> =req.body;
    let head=_req.head as RequestHead;
    let body:UploadPostRequestParams=_req.body as UploadPostRequestParams;
    let uid:number = head.uid as number;
    let post:Post = body.post;
    // let tid:number[]=[];
    // for(let item of post.topic){
    //     tid.push(item.tid);
    // }
    // console.log(post);
    
    let sql1_params=[0,uid,JSON.stringify(post.topic),post.content,post.releaseTime,post.isPaper,0,0];
    if(post.isPaper){
        sql1_params.push(post.coverUrl as string);
        sql1_params.push(post.title as string);
    }else{
        sql1_params.push('');
        sql1_params.push('');
    }

    let sql1="insert into post (pid,uid,topic,post_content,time,is_paper,num_approval,num_comment,cover,title) values (?,?,?,?,?,?,?,?,?,?);";
    


    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,sql1_params,(err:any,result:any,fields:any)=>{
            if (err){throw err;}
            if(result.insertId){
                console.log(result.insertId);
                res.json({
                    success: true,
                }as UploadPostResponse)
            }else{
                res.json({
                    success: false,
                    message: "上传错误！"
                }as UploadPostResponse)
            }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });


    });
}

