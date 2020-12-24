import express, { Application, Request, Response } from 'express';
import { config } from './infrastructure/config/Config';

import { createMySqlConnection } from './infrastructure/database/mysql';

const app: Application = express();
const con = createMySqlConnection(config);

const sql = 'select * from users';

app.get('/', (req: Request, res: Response) => {
  con.query(sql, (err, results) => {
    if (err != null) res.send(err.sqlMessage);
    res.send(results);
  });
});

app.listen(3000, () => console.log('server running'));



