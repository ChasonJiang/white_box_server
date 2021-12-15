import { HttpHeaders } from "@angular/common/http";
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

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
    //   Authorization: 'my-auth-token'
    })
  };


export interface PostRequestParams{
    pid: number;

}
export interface UploadPostRequestParams{
    post:Post;
}
export interface PostCardRequestParams{
    pid: number[];
}

export interface PostCardDetailIndexRequestParams{
    tid:number;
}

export interface PostCardDetailRequestParams{
    pid: number[];
}
// export interface TopicCardIndexRequestParams{

// }

export interface TopicCardRequestParams{
    tid:number[];
}

export interface CommentCardIndexRequestParams{
    pid: number;
}
export interface CommentCardRequestParams{
    pid: number;
    cid:number[];
}

export interface SubCommentRequestParams{
    pid: number;
    cid:number;
    sub_cid:number[];
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
    pid:number;
    cid?:number;
    sub_cid?:number;
    content:string;
}

export interface FollowRequestParams{
    // follower_uid:number;
    follow_uid:number;
    follow:boolean;
}

export interface LoginRequestParams{
    pwd:string;
}