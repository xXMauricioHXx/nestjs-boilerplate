import { Request } from 'express';

export interface HttpRequest extends Request {
  userInfo?: string;
  query: any;
}
