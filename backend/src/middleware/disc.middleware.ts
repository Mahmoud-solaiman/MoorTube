import { Response, NextFunction, Request } from "express";
import jwt from 'jsonwebtoken';
import { DecodedToken } from "../types/types";

export const protectDiscRoutes = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      const token = req.headers.authorization.split(' ')[1];
      const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY as string) as DecodedToken;
      req.userId = decodedToken.id;
      next();

    } else {
      res.status(401).json({
        message: "User not authorized. No access token has been provided",
        success: false
      });
    }
    
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error"
    })
  }
}