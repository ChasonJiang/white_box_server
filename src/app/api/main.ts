import * as Post from './Post';
import * as Topic from './Topic';
import * as Comment from './Comment';
import * as User from './User';
import * as Store from './Store';
export const TYPE:{[key:string]:Function} ={
    'GetPostCardList':Post.PostCardList,
    'GetPostCardIndexList':Post.PostCardIndexList,
    'GetPostCardDetailIndexList':Post.PostCardDetailIndexList,
    'GetPostCardDetailList':Post.PostCardDetailList,
    'GetPost':Post.getPost,
    'GetTopicCardIndexList':Topic.TopicCardIndexList,
    'SearchTopicCardList':Topic.SearchTopicCardList,
    'GetTopicCardList':Topic.TopicCardList,
    'SearchPostCardDetail':Post.SearchPostCardDetail,
    'GetCommentIndexList':Comment.CommentIndexList,
    'GetCommentList':Comment.CommentList,
    'GetSubCommentList':Comment.SubCommentList,
    'UploadComment':Comment.UploadComment,
    'UploadPost':Post.UploadPost,
    'SignUp':User.SignUp,
    'LogIn':User.LogIn,
    'LogOut':User.LogOut,
    'searchSimpleGame':Store.searchSimpleGame,
    'getSimpleGame':Store.getSimpleGame,
    'getstoreShowImg':Store.getstoreShowImg,
    'getdetailedgame':Store.getdetailedgame,
    'addgame':Store.addgame,
    'buygame':Store.buygame,
    'updategame':Store.updategame,
    'followgame':Store.followgame,
    'cancelfollowgame':Store.cancelfollowgame,
    'getgamefollowstate':Store.getgamefollowstate,
    'getgamebuystate':Store.getgamebuystate,
    "getGamelibrary":Store.getGamelibrary,
    "EditerUserInfo":User.EditerUserInfo,
    "DestroyAccount":User.DestroyAccount,
    "LoginValidation":User.LoginValidation,
    "GetMoments":User.GetMoments,
    "GetMomentIndexList":User.GetMomentIndexList
};