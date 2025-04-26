import { Request, Response } from "express";
import { VercelRequest, VercelResponse } from '@vercel/node';
import mongoose from 'mongoose';
import { register } from '../../server/src/controllers/userController';
import dbConnect from '../../server/src/utils/dbConnect';

export default async (req: VercelRequest, res: VercelResponse) => {
  await dbConnect();
  
  const expressReq = req as Request;
  const expressRes = res as unknown as Response;

  if (req.method === 'POST') {
    return register(expressReq, expressRes);
  }

  res.status(405).end(); // Method Not Allowed
};