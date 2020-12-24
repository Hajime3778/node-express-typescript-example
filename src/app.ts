import { config } from './infrastructure/config/Config';
import { Server } from './infrastructure/server/Server';
import { UserController } from './interface/controllers/UserController';
import { UserUsecase } from './application/usecase/UserUsecase';
import { UserRepository } from './infrastructure/database/mysql/repositories/UserRepository';
import { createMySqlConnection } from './infrastructure/database/mysql/mysql';


const connection = createMySqlConnection(config);
const server = new Server(config);
const express = server.express;

// Users API
const userRepository = new UserRepository(connection);
const userUsecase = new UserUsecase(userRepository);
const userController = new UserController(userUsecase);
express.use('/api/', userController.router);

server.run();
