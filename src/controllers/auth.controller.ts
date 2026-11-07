import type { RequestHandler } from "express";
import { login as loginUser, register as registerUser } from "../services/auth.service.js";

export const register: RequestHandler = async (request, response) => {
  const result = await registerUser(request.body);
  response.status(201).json(result);
};

export const login: RequestHandler = async (request, response) => {
  const result = await loginUser(request.body);
  response.status(200).json(result);
};
