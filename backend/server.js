import express from "express";
import cors from "cors";
import 'dotenv/config';
import dbConnect from "./dbConnection/db.js";
import { clerkMiddleware,clerkClient, requireAuth, getAuth } from '@clerk/express'
import { serve } from "inngest/express";
import { inngest, functions } from "./inngest/index.js"

const server = express();
const port = 3000;
const mongoUri = process.env.MONGO_URI;

// middleware
server.use(express.json());
server.use(cors());
server.use(clerkMiddleware())

// Set up the "/api/inngest" (recommended) routes with the serve handler
server.use("/api/inngest", serve({ client: inngest, functions }));

const startServer = async () => {
    try {
        await dbConnect(mongoUri);
        server.listen(port, () => {
            console.log(`now listening to pot ${port}`)
        })
    } catch (error) {
        console.log(error.message);
    }
}

startServer();
