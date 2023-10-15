import dotenv from "dotenv";
dotenv.config()
import pool from "./db.js";
import express, { json } from "express";

const app=express();
app.use(express.json())

app.get("/",(req,res)=>{
    res.send("api is running well and good");
})

app.get("/todos",async(req,res)=>{
    try {
        const results=await pool.query("SELECT * FROM todo")
        res.setHeader("content-type","application/json")
        res.send(JSON.stringify(results.rows))
        // res.json(results.rows)
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`error in server${error}`
        })
    }
})

app.post("/todos",async(req,res)=>{
    let result={}
    try {
        const {todo}=req.body;
        await pool.query("INSERT INTO todo (text) VALUES ($1)",[todo])
        result.success=true;
        res.setHeader("content-type","application/json")
        res.send(JSON.stringify(result))
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`error in server ${error}`
        })
    }
})

app.delete("/todos",async(req,res)=>{
    let result={}
    try {
        const {id}=req.body;
        await pool.query("DELETE FROM todo WHERE id=$1",[id])
        result.success=true;
        res.setHeader("content-type","application/json")
        res.send(JSON.stringify(result))
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`error in server ${error}`
        })
    }
})

app.put("/todos",async(req,res)=>{
    let result={}
    try {
        const {id,todo}=req.body;
        await pool.query("UPDATE todo SET text=$1 WHERE id=$2",[todo,id])
        result.success=true;
        res.setHeader("content-type","application/json")
        res.send(JSON.stringify(result))
    } catch (error) {
        res.status(500).json({
            success:false,
            message:`error in server ${error}`
        })
    }
})

app.listen(process.env.PORT,()=>{
    console.log(`connected to the server ${process.env.PORT}`)
})





