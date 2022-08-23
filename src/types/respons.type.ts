import { HttpStatus } from '@nestjs/common';
export interface ResponseObj<T> {
  message: string;
  statuseCode: HttpStatus;
  data?: T;
  error?: any;
}
