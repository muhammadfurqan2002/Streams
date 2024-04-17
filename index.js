const express=require('express');
const stream = require('node:stream');
const fs=require('fs');
const zlib = require('node:zlib');
const statusMonitor=require('express-status-monitor');

const app=express();

app.use(statusMonitor());

fs.createReadStream("dummy.txt").pipe(zlib.createGzip().pipe(fs.WriteStream('dummy.zip')));


app.get("/",(req,res)=>{
  const stream=fs.createReadStream("dummy.txt","utf-8");
  stream.on("data",(chunk)=>{
    return res.write(chunk);
  });
  stream.on("end",()=>{
    return res.end({msg:"nice one"});
  });
});

app.listen(8080,()=>{
    console.log("Server Started");
});