import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {start} from "./models/db.js"
import router from "./router/authRouter.js";
import bodyParser from "body-parser";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors()); 

start(); //for starting db 
 


app.use("/auth", router);
app.listen(PORT, () => {
  console.log(`Server is running on port = ${PORT}`);
});