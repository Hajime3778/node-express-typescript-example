import express, { Application, Request, Response } from 'express';
import mysql from 'mysql';
import { Config, config } from './config/Config';

const createMySqlConnection = (config: Config) => {  
  const connection = mysql.createConnection({
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('connected');
  });

  return connection;
};

const app: Application = express();
const con = createMySqlConnection(config);

const sql = 'select * from users';

app.get('/', (req: Request, res: Response) => {
  con.query(sql, (err, results) => {
    if (err != null) res.send(err.sqlMessage);
    res.send(results);
  });
  //res.send('Hello!!');
});

app.listen(3000, () => console.log('server running'));



