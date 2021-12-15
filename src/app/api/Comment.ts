import { Request, Response, NextFunction } from 'express'
import { COMMENT,BASE_COMMENT } from '../comment';

export {
    CommentIndexList,
    CommentList,
    SubCommentList
};

function CommentIndexList(db_pool:any, req:Request, res:Response){
    res.json({
        cid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function CommentList(db_pool:any, req:Request, res:Response){
    res.json({
        comments:COMMENT
    })
}

function SubCommentList(db_pool:any, req:Request, res:Response){
    res.json({
        subComments:[BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT]
    })
}