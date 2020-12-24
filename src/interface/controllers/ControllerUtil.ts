import { RequestHandler, Request, Response, NextFunction } from 'express';

export interface PromiseRequestHandler {
  (req: Request, res: Response, next: NextFunction): Promise<any>
}

export function asyncRequestHandler(fn: PromiseRequestHandler): RequestHandler {
  return (req, res, next) => fn(req, res, next).catch(next);
}