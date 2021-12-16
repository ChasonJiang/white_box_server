import { Request, Response, NextFunction } from 'express'
import { Requester, TopicCardRequestParams } from '../interface/Request';
import { TopicCardIndexResponse, TopicCardResponse } from '../interface/Response';
import { TopicCard } from '../interface/Topic';

export {
    TopicCardIndexList,
    SearchTopicCardList,
    TopicCardList
}

function TopicCardIndexList(db_pool:any, req:Request, res:Response){
    let sql1="select tid from topic;";

    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,(err:any,result:any,fields:any)=>{
             if (result.length!=0){
                let tids:number[] = [];
                for(let item of result){
                    tids.push(item.tid);
                }
                // console.log(pids);
                let _res:TopicCardIndexResponse={
                    tid:tids
                };
                res.json(_res);
                 
             }else{
                 console.log("TopicCardIndexList 查询失败！")
             }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function TopicCardList(db_pool:any, req:Request, res:Response){
    let _req:Requester<TopicCardRequestParams>= req.body as Requester<TopicCardRequestParams>;
    let body:TopicCardRequestParams=_req.body as TopicCardRequestParams;
    let tids:number[] = body.tid;
    let sql1_params:any[]=[tids];
    let sql1="select * from topic where tid in ?;";

    db_pool.getConnection((err:any,conn:any)=>{
        if (err){throw err;}
        conn.query(sql1,[sql1_params],(err:any,result:any,fields:any)=>{
             if (result.length!=0){
                let topicCards:TopicCard[] = [];
                for(let item of result){
                    let topicCard:TopicCard={
                        tid:item.tid,
                        name:item.name,
                        iconUrl:item.icon,
                        numberOfComments:0,
                    }
                    if(item.introduction!=null || item.introduction!='' || item.introduction!=undefined){
                        topicCard.introduction=item.introduction;
                    }
                    topicCards.push(topicCard);
                }
                // console.log(pids);
                let _res:TopicCardResponse={
                    topicCards: topicCards
                }
                res.json(_res);
                 
             }else{
                 console.log("TopicCardList 查询失败！")
             }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function SearchTopicCardList(db_pool:any, req:Request, res:Response){
    res.json({
        tid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}
