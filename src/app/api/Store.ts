import { detailedGame, simpleGame, storeShowImg } from "../gamelist"

import { Request, Response, NextFunction, text } from 'express'
import { detailedgame, simplegame } from "../interface/game";
import { addresultResponse, buygameresultResponse, getdetailedgameResponse, getstateResponse, simplegamelistResponse, storeShowImgResponse } from "../interface/Response";
import { adddetailedgameRequestParams, buygameRequestParams, getdetailedgameRequestParams, getstateRequestParams, Requester, searchSimpleGameRequestParams, SimpleGameRequestParams } from "../interface/Request";
export {
    searchSimpleGame,
    getSimpleGame,
    getstoreShowImg,
    getdetailedgame,
    addgame,
    buygame,
    updategame,
    followgame,
    cancelfollowgame,
    getgamefollowstate,
    getgamebuystate,
    getGamelibrary,
    getGamewish,
}
//store
function searchSimpleGame(db_pool: any, req: Request, res: Response) {
    // res.json({
    //     simplegamelist:simpleGame
    // })
    let _req: Requester<searchSimpleGameRequestParams> = req.body as Requester<searchSimpleGameRequestParams>;
    let content = _req.body?.content
    let sql1 = 'SELECT gid, gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum FROM game WHERE gamename REGEXP (?)';
     let sql1_params=content
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, sql1_params, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                let simplegamelist: simplegame[] = [];
                for (let item of result) {
                    let simplegame: simplegame = {
                        gid: item.gid,
                        gameName: item.gameName,
                        imgUrl: item.imgUrl,
                        gameType: item.gameType.split('$'),
                        nowPrice: item.nowPrice,
                        oldPrice: item.oldPrice,
                        Minimum: item.Minimum,
                    };
                    simplegamelist.push(simplegame);
                }
                let simplegamelistResponse: simplegamelistResponse = {
                    success: true,
                    simplegamelist:simplegamelist
                };
                console.log("simplegamelist is running");
                res.json(simplegamelistResponse);
            } else {
                console.log("searchsimplegamelist 查询错误！");
            }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    });
}

function getSimpleGame(db_pool: any, req: Request, res: Response) {
    let _req: Requester<SimpleGameRequestParams> = req.body as Requester<SimpleGameRequestParams>;
    let num=8;
    let type = _req.body?.type;
    let sql1 = '';
    if (type == "最新游戏") {
        sql1 = "SELECT gid, gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum FROM game  order by gid asc LIMIT ?,?;";
    }
    else if (type == "为您推荐") {
        sql1 = "SELECT gid, gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum FROM game  order by nowPrice desc LIMIT ?,? ;";
    }
    else {
        sql1 = "SELECT gid, gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum FROM game   order by onlineTime asc LIMIT ?,? ;";
    }
    // let sql1="select gid, gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum from game where pid in (?) and is_paper=1 ;";
    let sql1_params = [(_req.body as SimpleGameRequestParams).index * num, (_req.body as SimpleGameRequestParams).index * num + num];
    // console.log(sql1_params);
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, sql1_params, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                let simplegamelist: simplegame[] = [];
                for (let item of result) {
                    let simplegame: simplegame = {
                        gid: item.gid,
                        gameName: item.gameName,
                        imgUrl: item.imgUrl,
                        gameType: item.gameType.split('$'),
                        nowPrice: item.nowPrice,
                        oldPrice: item.oldPrice,
                        Minimum: item.Minimum,
                    };
                    simplegamelist.push(simplegame);
                }
                let simplegamelistResponse: simplegamelistResponse = {
                    
                    success: true,
                    simplegamelist:simplegamelist
                };
                console.log("simplegamelist is running");
                res.json(simplegamelistResponse);
            } else {

                // let simplegamelistResponse: simplegamelistResponse = {
                //     success: false,
                
                // };
                // res.json(simplegamelistResponse);
                console.log("getSimpleGame 查询错误！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}


function getstoreShowImg(db_pool: any, req: Request, res: Response) {
    let _req: Requester<null> = req.body as Requester<null>;
    let sql1 = "select gid,imgUrl from game order by nowPrice desc LIMIT 1,5";
    
    // console.log(sql1_params);
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1,  (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                let storeshowimg: string[] = [];
                let gidlist:number[]=[];
                for (let item of result) {
                    let img: string = item.imgUrl
                let gid:number = item.gid
                    storeshowimg.push(img);
                    gidlist.push(gid);
                }
                let storeShowimgResponse: storeShowImgResponse = {
                    storeShowImg: storeshowimg,
                    gid:gidlist,
                    success: true
                };
                console.log("getstoreShowImg is running");
                res.json(storeShowimgResponse);
            } else {
                console.log("getstoreShowImg 查询错误！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}


function getdetailedgame(db_pool: any, req: Request, res: Response) {
    let _req: Requester<getdetailedgameRequestParams> = req.body as Requester<getdetailedgameRequestParams>;
    let gameid = _req.body?.gameid as number;
    let sql1 = "select * from game where gid = (?) ";
    // let sql1_params=[(_req.body as getdetailedgameRequestParams).pid,];
    // console.log(sql1_params);
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, gameid, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                for (let item of result) {
                    let detailedgame: detailedgame = {
                        gid: item.gid,
                        gameName: item.gameName,
                        imgUrl: item.imgUrl,
                        imgshow: item.imgshow.split('$'),
                        gameLable: item.gameLable.split('$'),
                        Minimumprice: item.Minimumprice,
                        nowPrice: item.nowPrice,
                        oldPrice: item.oldPrice,
                        Minimum: item.Minimum,
                        gameType: item.gameType.split('$'),
                        score: item.score,
                        onlineNumber: item.onlineNumber,
                        favorableRate: item.favorableRate,
                        OnlineMaxYesterday: item.OnlineMaxYesterday,
                        averageOlnine: item.averageOlnine,
                        playerNumber: item.playerNumber,
                        onlineTime: item.onlineTime,
                        briefintroduction: { text: item.text, Issuedate: item.Issuedate, Developers: item.Developers, publisher: item.publisher }

                    };
                    let Response: getdetailedgameResponse = {
                        success: true,
                        detailedgame: detailedgame,
                    };
                    console.log("detailedgame is running");
                    res.json(Response);
                }


            } else {
                console.log("getdetailedgame 查询错误！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}
function addgame(db_pool: any, req: Request, res: Response) {
    let _req: Requester<adddetailedgameRequestParams> = req.body as Requester<adddetailedgameRequestParams>;
    // res.json({
    //     success:true
    // })
    
    let game: detailedgame  = _req.body?.detailedgame as detailedgame;
    let gameName = game.gameName;
    
    let imgUrl = game.imgUrl;
   
    let gameType: string = game.gameType.join('$');
    let gameLable = game.gameLable.join('$');
    // let gameType= JSON.stringify( game.gameType)
    // let gameLable =  JSON.stringify( game.gameLable)
    let Minimumprice = game.Minimumprice;
    let nowPrice = game.nowPrice;
    let oldPrice = game.oldPrice;
    let imgshow = game.imgshow.join('$');
    let Minimum = game.Minimum;

    let score = game.score;
    let onlineNumber = game.onlineNumber;

    let favorableRate = game.favorableRate;
    let OnlineMaxYesterday = game.OnlineMaxYesterday;
    let averageOlnine = game.averageOlnine;
    let playerNumber = game.playerNumber;
    let onlineTime = game.onlineTime;
    let text = game.briefintroduction.text;
    let Issuedate = game.briefintroduction.Issuedate;
    let Developers = game.briefintroduction.Developers;
    let publisher = game.briefintroduction.publisher;
    let sql1_params = [  gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum, imgshow, gameLable, Minimumprice, score, onlineNumber, favorableRate, OnlineMaxYesterday, averageOlnine, playerNumber, onlineTime, text, Issuedate, Developers, publisher]
    console.log(sql1_params)
    let sql1 = "insert into game( gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum, imgshow, gameLable, Minimumprice, score, onlineNumber, favorableRate, OnlineMaxYesterday, averageOlnine, playerNumber, onlineTime, text, Issuedate, Developers, publisher) value( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?, ?,? , ?);";

    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, sql1_params, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.insertId) {
                console.log(result.insertId);
                res.json({
                    success: true,
                } as addresultResponse)
            } else {
                console.log("上传错误！")
                res.json({
                    success: false,
                    message: "上传错误！"
                } as addresultResponse)
            }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });


    });
}

function updategame(db_pool: any, req: Request, res: Response) {
    let _req: Requester<adddetailedgameRequestParams> = req.body as Requester<adddetailedgameRequestParams>;
    // res.json({
    //     success:true
    // })
    
    let game: detailedgame  = _req.body?.detailedgame as detailedgame;
    let gid= game.gid;
    let gameName = game.gameName;
    
    let imgUrl = game.imgUrl;
   
    let gameType: string = game.gameType.join('$');
    let gameLable = game.gameLable.join('$');
    // let gameType= JSON.stringify( game.gameType)
    // let gameLable =  JSON.stringify( game.gameLable)
    let Minimumprice = game.Minimumprice;
    let nowPrice = game.nowPrice;
    let oldPrice = game.oldPrice;
    let imgshow = game.imgshow.join('$');
    let Minimum = game.Minimum;
    let score = game.score;
    let onlineNumber = game.onlineNumber;
    let favorableRate = game.favorableRate;
    let OnlineMaxYesterday = game.OnlineMaxYesterday;
    let averageOlnine = game.averageOlnine;
    let playerNumber = game.playerNumber;
    let onlineTime = game.onlineTime;
    let text = game.briefintroduction.text;
    let Issuedate = game.briefintroduction.Issuedate;
    let Developers = game.briefintroduction.Developers;
    let publisher = game.briefintroduction.publisher;
    console.log("update")
    let sql1_params = [  gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum, imgshow, gameLable, Minimumprice, score, onlineNumber, favorableRate, OnlineMaxYesterday, averageOlnine, playerNumber, onlineTime, text, Issuedate, Developers, publisher,gid]
    console.log(sql1_params)
    let sql1 = "UPDATE game set gameName=?, imgUrl=?, gameType=?, nowPrice=?, oldPrice=?, Minimum=?, imgshow=?, gameLable=?, Minimumprice=?, score=?, onlineNumber=?, favorableRate=?, OnlineMaxYesterday=?, averageOlnine=?, playerNumber=?, onlineTime=?, text=?, Issuedate=?, Developers=?, publisher=? where gid=?;";

    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, sql1_params, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.insertId) {
                console.log(result.insertId);
                res.json({
                    success: true,
                } as addresultResponse)
            } else {
                console.log("上传错误！")
                res.json({
                    success: false,
                    message: "上传错误！"
                } as addresultResponse)
            }
            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });


    });
}

function buygame(db_pool: any, req: Request, res: Response) {
    let _req: Requester<buygameRequestParams> = req.body as Requester<buygameRequestParams>;
let gid= _req.body?.gameid as number
console.log(gid)
let uid= _req.head.uid as string
let data=new Date();
let sql1_params =[uid,gid,data]
    let sql1 = "insert into buygame() value(?,?,?)";
    
    // console.log(sql1_params);
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1,sql1_params , (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                
               
                let buygameresultResponse: buygameresultResponse = {
                    
                    success: true
                };
                console.log("buygame is running");
                res.json(buygameresultResponse);
            } else {
                console.log("buygame 错误！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}

function followgame(db_pool: any, req: Request, res: Response) {
    let _req: Requester<buygameRequestParams> = req.body as Requester<buygameRequestParams>;
let gid= _req.body?.gameid as number

let uid= _req.head.uid as string
let data=new Date();
let sql1_params =[uid,gid,data]
    let sql1 = "insert into followgame() value(?,?,?)";
    
    // console.log(sql1_params);
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1,sql1_params , (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                
               
                let followgame: buygameresultResponse = {
                    
                    success: true
                };
                console.log("followgame is running");
                res.json(followgame);
            } else {
                console.log("followgame 错误！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}

function cancelfollowgame(db_pool: any, req: Request, res: Response) {
    let _req: Requester<buygameRequestParams> = req.body as Requester<buygameRequestParams>;
let gid= _req.body?.gameid as number

let uid= _req.head.uid as string

let sql1_params =[uid,gid]
    let sql1 = "DELETE FROM followgame where uid=? and gid=? ;";
    
    // console.log(sql1_params);
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1,sql1_params , (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                
               
                let cancelfollowgame: buygameresultResponse = {
                    
                    success: true
                };
                console.log("cancelfollowgame is running");
                res.json(cancelfollowgame);
            } else {
                console.log("cancelfollowgame 错误！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}



function getgamefollowstate(db_pool: any, req: Request, res: Response){
    let _req: Requester<getstateRequestParams> = req.body as Requester<getstateRequestParams>;
    let gid= _req.body?.gameid as number

let uid= _req.head.uid as string
    let sql1 = "select * from followgame where uid=? and gid=? ;";
    let sql1_params =[uid,gid]
   
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, sql1_params, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
              
                
                let getgamefollowstate: getstateResponse = {
                    state:true,
                    success: true
                };
                console.log("getgamefollowstate is running");
                res.json(getgamefollowstate);
            } else {
                let getgamefollowstate: getstateResponse = {
                    state:false,
                    success: true
                };
                console.log("getgamefollowstate is running");
                res.json(getgamefollowstate);
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}

function getgamebuystate(db_pool: any, req: Request, res: Response){
    
    let _req: Requester<getstateRequestParams> = req.body as Requester<getstateRequestParams>;
    let gid= _req.body?.gameid as number

let uid= _req.head.uid as string
    let sql1 = "select * from buygame where uid=? and gid=? ;";
    let sql1_params =[uid,gid]
   
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, sql1_params, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
              
                
                let getgamebuystate: getstateResponse = {
                    state:true,
                    success: true
                };
                console.log("getgamebuystate is running");
                res.json(getgamebuystate);
            } else {
                let getgamebuystate: getstateResponse = {
                    state:false,
                    success: true
                };
                console.log("getgamebuystate is running");
                res.json(getgamebuystate);
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}


function getGamelibrary(db_pool: any, req: Request, res: Response) {
    let _req: Requester<SimpleGameRequestParams> = req.body as Requester<SimpleGameRequestParams>;
    let num=8;
    let uid= _req.head.uid as string;
    let type = _req.body?.type;
     
    let sql1 = "SELECT game.gid, gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum FROM game,buygame where  game.gid=buygame.gid and uid=?  order by buytime asc LIMIT ?,?;";
    // let sql1="select gid, gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum from game where pid in (?) and is_paper=1 ;";
    let sql1_params = [uid,(_req.body as SimpleGameRequestParams).index * num, (_req.body as SimpleGameRequestParams).index * num + num];
    // console.log(sql1_params);
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, sql1_params, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                let simplegamelist: simplegame[] = [];
                for (let item of result) {
                    let simplegame: simplegame = {
                        gid: item.gid,
                        gameName: item.gameName,
                        imgUrl: item.imgUrl,
                        gameType: item.gameType.split('$'),
                        nowPrice: item.nowPrice,
                        oldPrice: item.oldPrice,
                        Minimum: item.Minimum,
                    };
                    simplegamelist.push(simplegame);
                }
                let simplegamelistResponse: simplegamelistResponse = {
                    
                    success: true,
                    simplegamelist:simplegamelist
                };
                console.log("getSimpleGame is running");
                res.json(simplegamelistResponse);
            } else {

                // let simplegamelistResponse: simplegamelistResponse = {
                //     success: false,
                
                // };
                // res.json(simplegamelistResponse);
                console.log("getSimpleGame 查询错误！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}



function getGamewish(db_pool: any, req: Request, res: Response) {
    let _req: Requester<SimpleGameRequestParams> = req.body as Requester<SimpleGameRequestParams>;
    let num=8;
    let uid= _req.head.uid as string;
    let type = _req.body?.type;
     
    let sql1 = "SELECT game.gid, gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum FROM game,followgame where  game.gid=followgame.gid and uid=?  order by followtime asc LIMIT ?,?;";
    // let sql1="select gid, gameName, imgUrl, gameType, nowPrice, oldPrice, Minimum from game where pid in (?) and is_paper=1 ;";
    let sql1_params = [uid,(_req.body as SimpleGameRequestParams).index * num, (_req.body as SimpleGameRequestParams).index * num + num];
    // console.log(sql1_params);
    db_pool.getConnection((err: any, conn: any) => {
        if (err) { throw err; }
        conn.query(sql1, sql1_params, (err: any, result: any, fields: any) => {
            if (err) { throw err; }
            if (result.length != 0) {
                let simplegamelist: simplegame[] = [];
                for (let item of result) {
                    let simplegame: simplegame = {
                        gid: item.gid,
                        gameName: item.gameName,
                        imgUrl: item.imgUrl,
                        gameType: item.gameType.split('$'),
                        nowPrice: item.nowPrice,
                        oldPrice: item.oldPrice,
                        Minimum: item.Minimum,
                    };
                    simplegamelist.push(simplegame);
                }
                let simplegamelistResponse: simplegamelistResponse = {
                    
                    success: true,
                    simplegamelist:simplegamelist
                };
                console.log("getGamewish is running");
                res.json(simplegamelistResponse);
            } else {

                // let simplegamelistResponse: simplegamelistResponse = {
                //     success: false,
                
                // };
                // res.json(simplegamelistResponse);
                console.log("getSimpleGame 查询错误！");
            }

            // When done with the connection, release it.
            conn.release();
            // Handle error after the release.
            if (err) throw err;
            // Don't use the connection here, it has been returned to the pool.
        });
    })
}