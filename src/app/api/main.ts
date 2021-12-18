import * as Post from './Post';
import * as Topic from './Topic';
import * as Comment from './Comment';
import * as User from './User';
import { addgame, buygame, cancelfollowgame, followgame, getdetailedgame, getgamefollowstate, getSimpleGame, getstoreShowImg, searchSimpleGame, updategame ,getgamebuystate} from './Store';
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
    'searchSimpleGame':searchSimpleGame,
    'getSimpleGame':getSimpleGame,
    'getstoreShowImg':getstoreShowImg,
    'getdetailedgame':getdetailedgame,
    'addgame':addgame,
    'buygame':buygame,
    'updategame':updategame,
    'followgame':followgame,
    'cancelfollowgame':cancelfollowgame,
    'getgamefollowstate':getgamefollowstate,
<<<<<<< HEAD
    'getgamebuystate':getgamebuystate,
=======
    "EditerUserInfo":User.EditerUserInfo,
>>>>>>> 581d82abe30d3dd6fb5a2dbc8c248e3924b5bd16
};