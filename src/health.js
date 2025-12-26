import http from 'http';

export const startHealthChecks=(workers,interval=5000)=>{
    setInterval(()=>{
        workers.forEach(worker=>{
            const req=http.request(
                {
                    host:worker.host,
                    port:worker.port,
                    family:4,
                    path:"/health",
                    timeout:2000
                },
                (res)=>{
                    res.resume(); 
                    worker.alive = res.statusCode === 200;
                }
            )

            req.on("error",(err)=>{
                worker.alive=false
            })

            req.on("timeout",()=>{
                worker.alive=false;
                req.destroy();
            })

            req.end();
        })
    },interval)
}