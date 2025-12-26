import { metrics } from "./metrics"
import { nextAliveWorker } from "./worker";
import http from 'http';

export const proxyRequest=(req,res)=>{
    metrics.totalRequests++;
    metrics.activeRequests++;

    res.on("finish",()=>{
        metrics.activeRequests--;
    })

    const worker=nextAliveWorker();

    if(!worker){
        metrics.failedRequests++;
        return res.status(503).send("No healthy workers available");
    }

    metrics.perWorkerRequests[worker.port]++;

    const proxyReq=http.request({
        host:worker.host,
        port:worker.port,
        path:req.originalUrl,
        method:req.method,
        headers:req.headers
    },(proxyRes)=>{
        res.writeHead(proxyRes.statusCode,proxyRes.headers);
        proxyRes.pipe(res);
    })
    proxyReq.on("error",()=>{
        worker.alive=false;
        metrics.failedRequests++;
        res.status(502).send("Bad Gateway")
    })

    req.pipe(proxyReq)
}