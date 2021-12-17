import * as Post from './Post';
import * as Topic from './Topic';
import * as Comment from './Comment';
import * as User from './User';
import { addgame, buygame, cancelfollowgame, followgame, getdetailedgame, getSimpleGame, getstoreShowImg, searchSimpleGame, updategame } from './Store';
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
    'cancelfollowgame':cancelfollowgame
};