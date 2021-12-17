import { parentPort, Worker } from 'worker_threads';


const server = new Worker(__dirname + '/server.js');
const recommendation_system = new Worker(__dirname + '/recommendation_system.js'); 
server.on('message',(result)=>{
    console.log(result);
});
recommendation_system.on('message',(result)=>{
    console.log(result);
});

