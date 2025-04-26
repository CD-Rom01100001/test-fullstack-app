import { Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "secret";

export const register = async (req: Request, res: Response) => {
  try {
    const { firstName, lastName, middleName, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ firstName, lastName, middleName, email, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "Пользователь зарегистрирован" });
  } catch (err) {
    res.status(500).json({ error: "Ошибка регистрации", details: err });
  }
};

export const getUsers = async (_req: Request, res: Response) => {
  const users = await User.find();
  res.json(users);
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const update = req.body;
  await User.findByIdAndUpdate(id, update);
  res.json({ message: "Пользователь обновлён" });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: "Пользователь удалён" });
};