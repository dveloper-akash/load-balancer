export const workers=[
    {host:"localhost",port:3000,alive:true},
    {host:"localhost",port:3001,alive:true},
    {host:"localhost",port:3002,alive:true}
]

// Round-Robin

let currentIndex=0;

export const nextAliveWorker=()=>{
    const aliveWorkers=workers.filter(w=>w.alive);
    if(aliveWorkers.length === 0) return null;

    const worker=workers[currentIndex%aliveWorkers.length];
    currentIndex++;
    return worker;
}