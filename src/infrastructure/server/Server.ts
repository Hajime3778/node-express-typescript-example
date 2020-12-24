import express from 'express';
import { Application, Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';
import { Config } from '../config/Config';
import { AddressInfo } from 'net';

export class Server {
  config: Config;
  express: Application;

  constructor(config: Config) {
    this.config = config;
    this.express = express();

    this.express.disable('x-powered-by');
    this.express.use(bodyParser.json());
    this.express.use((req: Request, res: Response, next:NextFunction ) => {
      res.header('Access-Control-Allow-Origin', '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
      res.header(
        'Access-Control-Allow-Headers',
        'Content-Type, Authorization, access_token'
      );

      if ('OPTIONS' === req.method) {
        res.send(200);
      } else {
        next();
      }
    });
  }

  run(): void {
    const server = this.express.listen(this.config.server.port, () => {
      const address = server.address() as AddressInfo;
      console.log(`Node.js is listening to PORT:${address.port}`);
    });
  }
}