import express, { Request, Response } from "express";

const router = express.Router();   

// Base router
router.get("/", (req: Request, res: Response) => {      
    res.send("Welcome to hell");             
});

export default router; 
