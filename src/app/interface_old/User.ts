export interface UserBaseInfo{
    uid: number;
    userName: string;
}
export interface UserCard extends UserBaseInfo{
    userLevel: number;
    avatarUrl: string;
    // releaseTime?:string;
    // numberOfStars?:number;
}

export interface UserInfo extends UserCard{
    
}