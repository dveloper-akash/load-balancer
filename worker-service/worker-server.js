import express from "express";

const app=express();

const PORT=process.env.PORT;

app.get('*',(req,res)=>{
    res.send(`Handled by worker on port ${PORT}`);
})

app.listen(PORT,()=>{
    console.log(`Worker running on ${PORT}`);
})