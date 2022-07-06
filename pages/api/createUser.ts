const mongoose = require('mongoose');
import dbConnect from '../../lib/dbConnect';

const User = require('../../models/loginModel');
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express';
import { CreateUser } from '../../types';

const createUser = async (req: Request, res: Response):Promise<void> => {
  // Check method type ie post/get etc
  if (req.method === 'POST') {
    await dbConnect();
    const newUser = await new User(req.body);
    newUser.save((err: ErrorRequestHandler, user: CreateUser) => {
      if (err) {
        return res.json(err);
      }
      res.send(user.username)
    });
  };
};

export default createUser;