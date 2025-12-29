import express from "express";
import {createServer} from "node:http";      // use for connection b/t socket sever & express instance 

import { Server } from "socket.io";

import mongoose from "mongoose";
import { connectToSocket } from "./controllers/socketManager.js";

import cors from "cors";
import userRoutes from "./routes/users.routes.js"

const app = express();
const server = createServer(app);   // need start server at the same port as app   
const io = connectToSocket(server);

app.set("port", (process.env.PORT || 8000));
app.use(cors());
app.use(express.json({limit: "40kb"}));
app.use(express.urlencoded({limit: "40kb", extended: true}));

app.use("/api/v1/users", userRoutes);


// const start = async () => {
//     app.listen(8000, () =>{
//         console.log("LISTENING ON PORT 8080");
//     });
// }

const start = async () => {
    app.set("mongo_user")
    const connectionDb = await mongoose.connect("mongodb+srv://arunpal8347:Oh4CPnN2Pm53SWYW@cluster0.iihtokh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
    console.log(`MONGO Connected DB Host: ${connectionDb.connection.host}`);

    server.listen(app.get("port"), () =>{
        console.log("LISTENING ON PORT 8000");
    });
}

start();