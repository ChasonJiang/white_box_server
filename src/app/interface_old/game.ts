export interface simplegame {
    gid: number;
    gameName:string;
    imgUrl: string;
    gameType: string[];
    nowPrice: number;
    oldPrice: number;
    Minimum:number;
}

export interface detailedgame extends simplegame {//详细的游戏数据
    
    
    
    imgshow:string[];
    gameLable:string[];
    Minimumprice:number;
    
    score:number;



    onlineNumber:number;
    favorableRate:number;
    OnlineMaxYesterday:number;
    averageOlnine:number;
    playerNumber:number;
    onlineTime:number;
    

    briefintroduction:{
        text:string,
        Issuedate:string,
    Developers:string,
    publisher:string,
    }
      
    
    

      dlc?:{name:string,price:number}[]
}



export interface storeshowimg{
    storeimg:string[]
}