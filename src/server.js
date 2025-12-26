import express from "express";
import { startHealthChecks } from "./health.js";
import { workers } from "./worker.js";
import { proxyRequest } from "./proxy.js";
import { metricsController } from "./controllers/metricsController.js";
const app=express();

startHealthChecks(workers);

app.get("/metrics",metricsController);

app.use(proxyRequest);

const PORT=80;

app.listen(PORT,()=>{
    console.log(`Load Balancer running on port ${PORT}`);
})