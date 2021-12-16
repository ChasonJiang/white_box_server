// import { HttpHeaders } from "@angular/common/http";
import { detailedgame } from "./game";
import { Post } from "./Post";

export interface Requester<T>{
    head:RequestHead;
    body?:T;
}



export interface RequestHead{
    // uid: uid of the requester 
    // type: type of the request eg: PostCardList,Post, CommentList, PostCardDetailList, etc.
    uid?: number;
    type: string;

}

// export const httpOptions = {
//     headers: new HttpHeaders({
//       'Content-Type':  'application/json',
//     //   Authorization: 'my-auth-token'
//     })
//   };


export interface PostRequestParams{
    pid: string;

}
export interface UploadPostRequestParams{
    post:Post;
}
export interface PostCardRequestParams{
    pid: string[];
}

export interface PostCardDetailIndexRequestParams{
    tid:number;
}

export interface PostCardDetailRequestParams{
    pid: string[];
}
// export interface TopicCardIndexRequestParams{

// }

export interface TopicCardRequestParams{
    tid:number[];
}

export interface CommentCardIndexRequestParams{
    pid: string;
}
export interface CommentCardRequestParams{
    pid: string;
    cid:string[];
}

export interface SubCommentRequestParams{
    pid: string;
    cid:string;
    sub_cid:string[];
}

export interface PostSearchRequestParams{
    tid:number;
    content:string;
}



export interface SimpleGameSearchRequestParams{
    content:string;
}

export interface SearchRequestParams{
    content:string;
}

export interface UploadCommentRequestParams{
    pid:string;
    cid?:string;
    sub_cid?:string;
    reply_to?:number;
    content:string;
}



//store
export interface searchSimpleGameRequestParams{
    content:string;
}


export interface SimpleGameRequestParams{
    type:string;
    index:number;
}

export interface getdetailedgameRequestParams{
    gameid:number;
}

export interface adddetailedgameRequestParams{
    detailedgame:detailedgame;
}

export interface buygameRequestParams{
    gameid:number;
}
export interface FollowRequestParams{
    // follower_uid:number;
    follow_uid:number;
    follow:boolean;
}

export interface LoginRequestParams{
    pwd:string;
}