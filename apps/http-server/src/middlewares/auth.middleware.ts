import { NextFunction, Request, Response } from "express";
import { z } from "zod";

const userSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const validateRegisterUser = (req: Request, res:Response, next:NextFunction) =>{
	const { error } = userSchema.safeParse(req.body);

	if(error){
		res.status(400).json({ message:"username and password field are required" });
		throw new Error("Error at register middleware: ", error);
	}

	next();
};

const validateLoginUser = (req: Request, res:Response, next:NextFunction) =>{
	const { error } = userSchema.safeParse(req.body);

	if(error){
		res.status(400).json({ message:"username and password field are required" });
		throw new Error("Error at login middleware: ", error);
	}

	next();
};

export {
	validateLoginUser,
	validateRegisterUser
}