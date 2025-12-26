import express from "express";
import { startHealthChecks } from "./health";
import { workers } from "./worker";
import { proxyRequest } from "./proxy";
import { metricsController } from "./controllers/metricsController.js";
const app=express();

startHealthChecks(workers);

app.get("/metrics",metricsController);

app.use(proxyRequest);

const PORT=80;

app.listen(PORT,()=>{
    console.log(`Load Balancer running on port ${PORT}`);
})