import * as dotenv from 'dotenv';
dotenv.config();

const { 
  MYSQL_HOST,
  MYSQL_PORT,
  MYSQL_USER,
  MYSQL_PASS,
  MYSQL_DB,
  PORT,
} = process.env;

type Config = {
  server: {
    port: number;
  },
  mysql: {
    host: string,
    port: number,
    user: string,
    password: string,
    database: string,
  }
}

const config: Config = {
  server: {
    port: parseInt(PORT as string),
  },
  mysql: {
    host: MYSQL_HOST as string,
    port: parseInt(MYSQL_PORT as string),
    user: MYSQL_USER as string,
    password: MYSQL_PASS as string,
    database: MYSQL_DB as string,
  }
};

export { Config, config };