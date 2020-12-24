import mysql, { Connection } from 'mysql';
import { Config } from '../config/Config';

export const createMySqlConnection = (config: Config): Connection => {  
  const connection = mysql.createConnection({
    host: config.mysql.host,
    port: config.mysql.port,
    user: config.mysql.user,
    password: config.mysql.password,
    database: config.mysql.database,
  });
  
  connection.connect((err) => {
    if (err) throw err;
    console.log('connected mysql');
  });

  return connection;
};
