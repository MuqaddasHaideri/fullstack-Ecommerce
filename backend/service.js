import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {start} from "./models/db.js"
dotenv.config();

const app = express();

app.use(cors()); 

start(); //for starting db 
 
const PORT = process.env.PORT || 3000;


app.listen(PORT, () => {
  console.log(`Server is running on port = ${PORT}`);
});