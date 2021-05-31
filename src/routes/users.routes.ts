import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/UserRepository';
import CreateUserService from './../services/CreateUserService';

const userRouter = Router();

userRouter.get('/', async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.find();
  return response.json(users);
});

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password, money } = request.body;
    const createUser = new CreateUserService();

    const nameLowerCased = name.toLowerCase();
    const emailLowerCased = email.toLowerCase();

    const user = await createUser.execute({
      name: nameLowerCased,
      email: emailLowerCased,
      password,
      money,
    });
    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

userRouter.post('/login', async (request, response) => {
    try {
      const { email, password } = request.body;
  
      const userRepository = getCustomRepository(UserRepository);
  
      const checkAdminExists = await userRepository.findOne({
        where: { email, password },
      });
  
  
      if (!checkAdminExists) {
        return response.status(400).json({ error: "user not exist" });
      }
  
      return response.json(checkAdminExists)
  
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  });

export default userRouter;