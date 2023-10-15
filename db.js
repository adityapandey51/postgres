import pkg from "pg";
import dotenv from "dotenv";
dotenv.config()

const {Pool}=pkg;

const pool=new Pool({
    host:"localhost",
    user:"postgres",
    port:5432,
    password:process.env.DATABASE_PASSWORD,
    database:"todo"
})
pool.connect()
.then(()=>{
    console.log("connected")
}).catch((err)=>{
    console.log(err)
})
export default pool