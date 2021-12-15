import { Topic } from './Topic';
import { UserCard } from './User'

export interface PostInfo{
    // user id
    uid:number;
    // post id
    pid:number;
    releaseTime:string;
    topic:Topic[];
}

export interface PostCard extends PostInfo{
    title:string;
    coverUrl:string;
    numberOfComments:number;
}

// export interface PostContent{
//     // content is a template of the post,and it included text and image
//     content:string;
//     imgUrl?:string[];
// }

export interface Post extends PostInfo{
    coverUrl?:string;
    // userCard:UserCard;
    title?:string;
    content:string;
    imgUrl?:string[];
    numberOfComments:number;
    numberOfApproval:number;
    isPaper:boolean;
}

export interface PostCardDetail extends Post{
    userCard:UserCard;
}