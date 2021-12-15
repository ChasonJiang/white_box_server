import { Post, PostCard, PostCardDetail } from "./Post";
import { TopicCard } from "./Topic";
import { UserCard, UserInfo } from "./User";
import { Comment,SubComment } from "./Comment";
export interface PostResponse{
    post: Post;
    userCard: UserCard;
}

export interface PostCardIndexResponse{
    pid: number[];
}

export interface PostCardResponse{
    postCards: PostCard[];
}

export interface PostCardIndexResponse{
    pid: number[];
}
export interface PostCardDetailIndexResponse{
    pid: number[];
}
export interface PostCardDetailResponse{
    data:{
        postCardsDetail: PostCardDetail,
        userCard: UserCard
    }[];
}

export interface UserDetailsResponse{
    success: boolean;
    message?: string;
    userInfo?: UserInfo;
}

export interface PostSearchResponse{
    success: boolean;
    message?: string;
    pid?: number[];
}

export interface TopicCardIndexResponse{
    tid:number[];
}

export interface TopicCardResponse{
    topicCards: TopicCard[];
}

export interface CommentIndexResponse{
    cid:number[];
}

export interface CommentResponse{
    comments:Comment[]
}
export interface SubCommentResponse{
    subComments:SubComment[]
}
export interface UploadPostResponse{
    success: boolean;
    message?: string;
}
export interface UploadCommentResponse{
    success: boolean;
    message?: string;
}
export interface FollowResponse{
    success: boolean;
    message?: string;
}
export interface LoginResponse{
    success: boolean;
    message?: string;
    userInfo?:UserInfo;
}