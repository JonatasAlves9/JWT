import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import 'dotenv/config';
import jwt from 'jsonwebtoken';
import sha1 from 'sha1';

import UserRepository from '../repositories/UserRepository';
import CreateUserService from './../services/CreateUserService';

const userRouter = Router();

function verifyJWT(req: any, res: any, next:any){
  
  var token = req.headers['x-access-token'];
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, process.env.SECRET, function(err: any, decoded: any) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
  });
}

userRouter.get('/',verifyJWT,async (request, response) => {
  const userRepository = getCustomRepository(UserRepository);
  const users = await userRepository.find();
  return response.json(users);
});

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, pass, money } = request.body;
    const createUser = new CreateUserService();

    const nameLowerCased = name.toLowerCase();
    const emailLowerCased = email.toLowerCase();

    const password = sha1(pass);


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

declare var process : {
  env: {
    SECRET: string
  }
}

userRouter.post('/login', async (request, response) => {
    try {
      const { email, pass } = request.body;
  
      const password = sha1(pass);

      const userRepository = getCustomRepository(UserRepository);

      const checkAdminExists = await userRepository.findOne({
        where: { email, password },
      });
  
      const token = jwt.sign({ email }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      

      if (!checkAdminExists) {
        return response.status(400).json({ error: "user not exist" });
      }
  
      const user = {
        email,
        pass
      }
      return response.json({user, token})
  
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  });

export default userRouter;