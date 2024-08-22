import { JwtPayload } from "jsonwebtoken";
import { verifyToken } from "../modules/auth/auth.utils";
import { NextFunction, Request, Response } from "express";
import { UserRole } from "@prisma/client";
import configs from "../configs";
import prisma from "../../shared/prisma";
import AppError from "../errors/AppError";
import httpStatus from "http-status";

const auth = (...roles: UserRole[]) => {
  return async (
    req: Request & { user?: any },
    res: Response,
    next: NextFunction
  ) => {
    try {
      //  Get Token From Headers **
      const token = req.headers?.authorization?.split(" ")[1];

      if (!token) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are UnAuthorized!!!");
      }

      const payload = verifyToken(
        token,
        configs.access_secret as string
      ) as JwtPayload;

      const user = await prisma.user.findUniqueOrThrow({
        where: {
          email: payload.email,
          status: "ACTIVE",
        },
      });

      if (!user) {
        throw new AppError(httpStatus.UNAUTHORIZED, "You are UnAuthorized!!!");
      }

      if (roles.length && !roles?.includes(user?.role)) {
        throw new AppError(httpStatus.FORBIDDEN, "Forbidden!!!");
      }

      //  Set Payload to Request ::

      req.user = payload;

      next();
    } catch (err) {
      next(err);
    }
  };
};

export default auth;
