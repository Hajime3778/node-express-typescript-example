//import { Request, Response } from 'express';
import { config } from './infrastructure/config/Config';
import { Server } from './infrastructure/server/Server';
import { UserRepository } from './infrastructure/repositoriy/UserRepository';
import { createMySqlConnection } from './infrastructure/database/mysql';

import { RequestHandler, Request, Response, NextFunction } from 'express';

interface PromiseRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>
}

function asyncRequestHandler(fn: PromiseRequestHandler): RequestHandler {
  return (req, res, next) => fn(req, res, next).catch(next);
}

const connection = createMySqlConnection(config);
const server = new Server(config);

const userRepository = new UserRepository(connection);

server.express.get('/', asyncRequestHandler(getAll));

server.run();


async function getAll(req: Request, res: Response) {
  const users = await userRepository.getAll().catch((err: string) => err);
  res.send(users);
}