import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

interface TokenData {
    userId: number;
    userRole: string;
    userName?: string;
}

declare global {
    namespace Express {
        interface Request {
            tokenData: TokenData;
        }
    }
}

export const auth = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        res.status(401).json({
            message: "Unauthorized access",
        });
        return;
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

        if (typeof decoded.userId !== 'number' || isNaN(Number(decoded.userId))) {
            throw new Error("Invalid token payload: userId is not a number");
        }

        req.tokenData = {
            userId: Number(decoded.userId),
            userRole: decoded.userRole
           // userName: decoded.firstName
        };

        next();
    } catch (error) {
        
        res.status(401).json({
            message: "Invalid token provided",
        });
    }
};