import express, { Router } from 'express';


const routes = Router();

routes.get('/', (request, response) =>
  response.json({ message: 'Hello Word' })
);
// middleware
routes.use(express.json());
routes.use(express.urlencoded());

export default routes;