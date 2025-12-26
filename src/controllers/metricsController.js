import { metrics } from "../metrics"
import { workers } from "../worker"

export const metricsController=(req,res)=>{
    res.type("text/plain").send(`
        requests_total ${metrics.totalRequests}
        requests_failed ${metrics.failedRequests}
        requests_active ${metrics.activeRequests}
        worker_3001_alive ${workers[0].alive ? 1 : 0}
        worker_3002_alive ${workers[1].alive ? 1 : 0}
        worker_3003_alive ${workers[2].alive ? 1 : 0}
        worker_3001_requests ${metrics.perWorkerRequests[3000]}
        worker_3002_requests ${metrics.perWorkerRequests[3001]}
        worker_3003_requests ${metrics.perWorkerRequests[3002]}
    `)
}