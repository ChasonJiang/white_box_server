import { UserBaseInfo,UserCard } from './User'

export interface SubComment{
    pid: string;
    cid:string;
    sub_cid: string;
    userInfo:UserBaseInfo,
    replyTo?:UserBaseInfo,
    commentContent:string,
    commentTime:string,
}

export interface Comment{
    pid:string;
    cid:string,
    userCard:UserCard,
    sub_cid:string[],
    // reply:SubComment[];
    // replyTo?:UserBaseInfo,
    commentContent:string,
    commentTime:string,
}