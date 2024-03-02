import { MongooseError } from 'mongoose';

export interface IMongooseError extends Pick<MongooseError, 'name'> {
    code: number;
    message: string;
}

export interface IExceptionResponse {
    message: string;
}
