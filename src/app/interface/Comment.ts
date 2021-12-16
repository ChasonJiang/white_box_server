import { UserBaseInfo,UserCard } from './User'

export interface SubComment{
    sub_cid: string;
    userInfo:UserBaseInfo,
    replyTo?:UserBaseInfo,
    commentContent:string,
    commentTime:string,
}

export interface Comment{
    cid:string,
    userCard:UserCard,
    sub_cid:string[],
    // reply:SubComment[];
    // replyTo?:UserBaseInfo,
    commentContent:string,
    commentTime:string,
}