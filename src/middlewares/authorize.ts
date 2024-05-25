import {  Request, Response, NextFunction } from "express";
import { UserRoles } from "../constants/UserRoles";

export const authorize = (allowedRoles: string[])=>{
    return (req: Request, res:Response, next:NextFunction)=>{
        
        const userRole = req.tokenData.userRole;

        if(userRole === UserRoles.ADMIN.name){
            return next();
        }

        if (allowedRoles.includes(userRole)) {
            return next();    
        }
        return res.status(403).json({
            message: "Unauthorized access",
        })
    };
};

