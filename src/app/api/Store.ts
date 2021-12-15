import { detailedGame, simpleGame, storeShowImg } from "../gamelist"

import { Request, Response, NextFunction } from 'express'
export{
    searchSimpleGame,
    getSimpleGame,
    getstoreShowImg,
    getdetailedgame,
    addgame,
    buygame
}
//store
function searchSimpleGame(db_pool:any,req:Request, res:Response) {
    res.json({
        simplegamelist:simpleGame
    })
}

function getSimpleGame(db_pool:any,req:Request, res:Response) {
    res.json({
        simplegamelist:simpleGame
    })
}


function getstoreShowImg(db_pool:any,req:Request, res:Response){
    res.json({
        storeShowImg:storeShowImg
    })
}


function getdetailedgame(db_pool:any,req:Request, res:Response){
    res.json({
        detailedgame:detailedGame[0]
    })
}
function addgame(db_pool:any,req:Request, res:Response){
    res.json({
        success:true
    })
}

function buygame(db_pool:any,req:Request, res:Response){
    res.json({
        success:true
    })
}

