import { DomainModel } from './DomainModel';

export type User = {
  id: string;
  name: string;
  email: string;
  description: string;
} & DomainModel;
