import express, { Application, Request, Response, NextFunction } from 'express'
import { COMMENT,BASE_COMMENT } from './comment';
import { detailedGame, simpleGame ,storeShowImg} from './gamelist';
import { detailedgame } from './interface/game';
import { POST } from './post';
import { POST_CARD } from './postcard';
import { TOPIC_CARD } from './TopicCard';
import { USER_CARD_INFO } from './user';
const app = express();
const port = 3500;
const cors=require("cors");

app.use(express.json({'limit':'100mb'}));
app.use(express.urlencoded({extended:false}));
app.use(cors()); 


const TYPE:{[key:string]:Function} ={
    'GetPostCardList':PostCardList,
    'GetPostCardIndexList':PostCardIndexList,
    'GetPostCardDetailIndexList':PostCardDetailIndexList,
    'GetPostCardDetailList':PostCardDetailList,
    'GetPost':Post,
    'GetTopicCardIndexList':TopicCardIndexList,
    'SearchTopicCardList':SearchTopicCardList,
    'GetTopicCardList':TopicCardList,
    'SearchPostCardDetail':SearchPostCardDetail,
    'GetCommentIndexList':CommentIndexList,
    'GetCommentList':CommentList,
    'GetSubCommentList':SubCommentList,
    'UploadPost':UploadPost,
    'searchSimpleGame':searchSimpleGame,
    'getSimpleGame':getSimpleGame,
    'getstoreShowImg':getstoreShowImg,
    'getdetailedgame':getdetailedgame,
    'addgame':addgame,
    'buygame':buygame
};

app.post('/api',(req:Request, res:Response,next:NextFunction) =>main(req,res,next));

function main(req:Request, res:Response, next:NextFunction){
    
    let body=req.body;
    try{
        TYPE[body.head.type](req,res);

    }catch(err){
        res.send("未知类型！");
    }finally{
        // next();
    }

    // return;
}

function PostCardIndexList(req:Request, res:Response){
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function PostCardList(req:Request, res:Response){
    res.json({
        postCards:POST_CARD
    });
}

function PostCardDetailIndexList(req:Request, res:Response){
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function PostCardDetailList(req:Request, res:Response){
    res.json({
        postCardsDetail:[POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST,POST]
    });
}

function Post(req:Request, res:Response){
    console.log("get post");
    res.json({
        post:POST,
        userCard:USER_CARD_INFO,
    });
}

function TopicCardIndexList(req:Request, res:Response){
    res.json({
        tid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function SearchTopicCardList(req:Request, res:Response){
    res.json({
        tid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function TopicCardList(req:Request, res:Response){
    res.json({
        topicCards:TOPIC_CARD,
    })
}

function SearchPostCardDetail(req:Request, res:Response){
    res.json({
        pid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function CommentIndexList(req:Request, res:Response){
    res.json({
        cid:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,]
    });
}

function CommentList(req:Request, res:Response){
    res.json({
        comments:COMMENT
    })
}

function SubCommentList(req:Request, res:Response){
    res.json({
        subComments:[BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT,BASE_COMMENT]
    })
}
function UploadPost(req:Request, res:Response){
    console.log(req.body.body.post);
    res.json({
        success:true,
    })
}

//store
function searchSimpleGame(req:Request, res:Response) {
    res.json({
        simplegamelist:simpleGame
    })
}

function getSimpleGame(req:Request, res:Response) {
    res.json({
        simplegamelist:simpleGame
    })
}


function getstoreShowImg(req:Request, res:Response){
    res.json({
        storeShowImg:storeShowImg
    })
}


function getdetailedgame(req:Request, res:Response){
    res.json({
        detailedgame:detailedGame[0]
    })
}
function addgame(req:Request, res:Response){
    res.json({
        success:true
    })
}

function buygame(req:Request, res:Response){
    res.json({
        success:true
    })
}


app.listen(port,()=>{
    console.log(`white box server listening at http://localhost:${port}`)
});
