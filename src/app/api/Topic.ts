import { Request, Response, NextFunction } from 'express'

export {
    TopicCardIndexList,
    SearchTopicCardList,
    TopicCardList
}

function TopicCardIndexList(db_pool:any, req:Request, res:Response){
    res.json({
        tid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function TopicCardList(db_pool:any, req:Request, res:Response){
    // res.json({
    //     topicCards:TOPIC_CARD,
    // })
}

function SearchTopicCardList(db_pool:any, req:Request, res:Response){
    res.json({
        tid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}
