//  Create Admin **

import { NextFunction, Request, Response } from "express";
import { userServices } from "./user.services";
import { IUser } from "./user.interface";

const createAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body;
  console.log(user);
  const result = await userServices.createAdmin(user);
  
  res.json({
    result,
  });
};

export const userController = {
  createAdmin,
};
