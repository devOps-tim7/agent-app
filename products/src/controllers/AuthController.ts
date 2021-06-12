import { Request, Response } from 'express';
import AuthService from '../services/AuthService';

const login = async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const token = await AuthService.login(username, password);
  res.header('auth-token', token).send({ token: token });
};

export default {
  login,
};
