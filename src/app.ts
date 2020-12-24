import { Request, Response } from 'express';
import { config } from './infrastructure/config/Config';
import { Server } from './infrastructure/server/Server';
import { createMySqlConnection } from './infrastructure/database/mysql';

const con = createMySqlConnection(config);
const server = new Server(config);

server.express.get('/', (req: Request, res: Response) => {
  const sql = 'select * from users';
  con.query(sql, (err, results) => {
    if (err != null) res.send(err.sqlMessage);
    res.send(results);
  });
});

server.run();
