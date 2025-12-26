import express from "express";

const app=express();

const PORT=process.env.PORT;

app.get("/health", (req, res) => {
  res.status(200).send("OK");
});


app.use((req,res)=>{
    res.send(`Handled by worker on port ${PORT}`);
})

app.listen(PORT,()=>{
    console.log(`Worker running on ${PORT}`);
})