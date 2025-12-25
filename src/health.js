import http from 'http';

export const startHealthChecks=(workers,interval=5000)=>{
    setInterval(()=>{
        workers.forEach(worker=>{
            const req=http.request(
                {
                    host:worker.host,
                    port:worker.port,
                    timeout:2000
                },
                ()=>{
                    worker.alive=true;
                }
            )

            req.on("error",()=>{
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