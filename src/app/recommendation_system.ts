const mysql = require("mysql");
const conn=mysql.createConnection({
    host     : '106.52.148.60',
    user     : 'white_box',
    password : 'Project@white_box_410',
    database : 'white_box',
});


function recommendation():void{
    console.log("start 1h recommendation...");
    let sql1="truncate recommendation;";
    let sql2="insert into recommendation(pid,hot) select pid,(num_comment+num_approval)*10 as hot from (select pid,num_comment,num_approval from (select pid,time,num_comment,num_approval from post order by time DESC limit 1000 ) as t1 order by num_comment DESC limit 500) as t2;"
    conn.beginTransaction(function(err: any) {
        if (err) { throw err; }
        conn.query(sql1,(err:any,result:any,fields:any)=>{
            if (err) {
                return conn.rollback(function() {
                throw err;
              });
            }
            conn.query(sql2,(err:any,result:any,fields:any)=>{
                if (err) {
                    return conn.rollback(function() {
                    throw err;
                  });
                }
                conn.commit(function(err: any) {
                    if (err) {
                    return conn.rollback(function() {
                        throw err;
                    });
                    }
                    console.log("1h recommendation success!");
                });
            
            });
        });

    });

}


function main():void{
    // 1h
    recommendation();
    setInterval(recommendation,3600000);
}

main();

process.on('uncaughtException',(err)=>{
    console.log(err);
    // return parentPort.postMessage(err);
});

process.on('unhandkedRejection',(err)=>{
    console.log(err);
});