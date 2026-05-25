export const workers=[
    {host:"127.0.0.1",port:3000,alive:true,failureCount:0},
    {host:"127.0.0.1",port:3001,alive:true,failureCount:0},
    {host:"127.0.0.1",port:3002,alive:true,failureCount:0}
]

// Round-Robin

let currentIndex=0;

export const nextAliveWorker=()=>{
    const aliveWorkers=workers.filter(w=>w.alive);
    if(aliveWorkers.length === 0) return null;

    const worker=aliveWorkers[currentIndex%aliveWorkers.length];
    currentIndex++;
    return worker;
}