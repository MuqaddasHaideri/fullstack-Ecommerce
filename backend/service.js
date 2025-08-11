import express from "express"
import dotenv from "dotenv"
import cors from "cors"
import {start} from "./models/db.js"
import router from "./router/authRouter.js";
import bodyParser from "body-parser";
import productRouter from "./router/productRouter.js";
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
app.use(bodyParser.json());
app.use(cors()); 

start(); //for starting db 
 
app.use(express.json());  

app.use("/api/auth", router);
app.use("/api", productRouter);

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port = ${PORT}`);
});