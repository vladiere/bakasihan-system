import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './config.util';

const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    const user = await jwt.verify(token, config.server.token.accessSecret) as jwt.JwtPayload;

    req.body.user = user;
    next();
  } catch (err) {
    // Handle token verification errors
    return res.status(401).json({ message: 'Unauthorized', error: err });
  }
};

export default verifyToken;
