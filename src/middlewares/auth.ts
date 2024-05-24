import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";


interface TokenData {
    userId: number;
    userRole: string;
    userName?:string;
    
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

        req.tokenData = {
            userId: decoded.userId,
            userRole: decoded.userRole,
            userName:decoded.userName //antes estaba firstName
        };
        // console.log(req.tokenData);
        console.log(token);
        
        
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token provided",
        });
    }
};
