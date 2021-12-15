
import { Request, Response, NextFunction } from 'express'
// import { COMMENT,BASE_COMMENT } from '../comment';
// import { LoginResponse } from '../interface/Response';
// import { UserInfo } from '../interface/User';
import { POST } from '../post';
import { POST_CARD } from '../postcard';
// import { TOPIC_CARD } from '../TopicCard';
import { USER_CARD_INFO } from '../user';
export {
    PostCardIndexList,
    PostCardList,
    PostCardDetailIndexList,
    PostCardDetailList,
    Post,
    SearchPostCardDetail,
    UploadPost
    
};

function PostCardIndexList(db_pool:any, req:Request, res:Response){
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function PostCardList(db_pool:any, req:Request, res:Response){
    res.json({
        postCards:POST_CARD
    });
}

function PostCardDetailIndexList(db_pool:any, req:Request, res:Response){
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function PostCardDetailList(db_pool:any, req:Request, res:Response){
    res.json({
        postCardsDetail:[POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST]
    });
}

function Post(db_pool:any, req:Request, res:Response){
    console.log("get post");
    res.json({
        post:POST,
        userCard:USER_CARD_INFO,
    });
}
    
function SearchPostCardDetail(db_pool:any, req:Request, res:Response){
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function UploadPost(db_pool:any, req:Request, res:Response){
    console.log(req.body.body.post);
    res.json({
        success:true,
    })
}

