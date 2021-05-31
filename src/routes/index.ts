import express, { Router } from 'express';


import userRouter from './users.routes';

const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Word' })
);
// middleware
routes.use(express.json());
routes.use('/users', userRouter);
//routes.use(express.urlencoded());

export default routes;