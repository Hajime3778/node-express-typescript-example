import { TimestampColumn } from './TimestampColumn';

export type User = {
  id: string;
  name: string;
  email: string;
  description: string;
};

export type UserTable = User & TimestampColumn;
