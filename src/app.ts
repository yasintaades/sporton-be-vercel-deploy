import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import { authenticate } from "./middlewares/auth.middleware";

const app= express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);

app.get("/", (req,res)=>{
    res.send("sporton backend API is running ");
});

app.get("/test-middleware",authenticate, (req,res)=>{
    res.send("Hore km bisa mengaksesnya karena kamu memggunakan token");
});

export default app;