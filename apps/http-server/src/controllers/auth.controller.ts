import { queryDB } from "@repo/db/client";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const login = async (req: Request, res: Response):Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "all fields are required" });
      return;
    }

    const userExists = await queryDB(
      "select * from Users where username = $1",
      [username]
    );

    if (!userExists) {
      res
        .status(400)
        .json({
          message: "username not found! pl register",
        });
        return;
    }

    const createUser = await queryDB(
      "INSERT INTO Users(username, password) VALUES($1, $2) RETURNING id",
      [username, password]
    );

    if (createUser && createUser.length > 0) {
      const userId = createUser[0].id;
      const userName = createUser[0].username;

      const token = jwt.sign(
        { id: userId, username: userName },
        process.env.JWT_SEC as string,
        { expiresIn: "30d" }
      );

      res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });

      res.status(201).json({
        message: "User registered successfully",
        token,
      });
      return;
    } else {
      res.status(500).json({ message: "User registration failed" });
      return;
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
    return;
  }
};

export const register = async (req: Request, res: Response):Promise<void> => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    const userExists = await queryDB(
      "SELECT * FROM Users WHERE username = $1",
      [username]
    );

    if (userExists && userExists.length > 0) {
      res.status(400).json({ message: "Username already exists!" });
      return;
    }

    const createUser = await queryDB(
      "INSERT INTO Users(username, password) VALUES($1, $2) RETURNING id",
      [username, password]
    );

    if (createUser && createUser.length > 0) {
      const userId = createUser[0].id;

      const token = jwt.sign(
        { id: userId },
        process.env.JWT_SEC as string,
        { expiresIn: '1h' }
      );

      res.status(201).json({
        message: "User registered successfully",
        token
      });
      return;
    } else {
      res.status(500).json({ message: "User registration failed" });
      return;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}
