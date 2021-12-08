import { UserBaseInfo,UserCard } from './User'

export interface SubComment{
    pid: number;
    cid:number;
    sub_cid: number;
    userInfo:UserBaseInfo,
    replyTo?:UserBaseInfo,
    commentContent:string,
    commentTime:string,
}

export interface Comment{
    pid:number;
    cid:number,
    userCard:UserCard,
    sub_cid:number[],
    // reply:SubComment[];
    // replyTo?:UserBaseInfo,
    commentContent:string,
    commentTime:string,
}