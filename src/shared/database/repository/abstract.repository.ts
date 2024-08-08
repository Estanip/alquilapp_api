import { FilterQuery, SaveOptions, Types, UpdateQuery } from 'mongoose';

export abstract class AbstractDatabaseRepository {
  abstract create<T>(document: T, options?: SaveOptions): Promise<T>;

  abstract deleteById(_id: Types.ObjectId): Promise<void>;

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  abstract deleteOne(field: any, value: any): Promise<void>;

  abstract findById<T>(_id: Types.ObjectId, returnError: boolean): Promise<T>;

  abstract findOne<T>(FilterQuery: FilterQuery<T>, returnError: boolean): Promise<T>;

  abstract findOneAndUpdate<T>(
    FilterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
    returnError: boolean,
  ): Promise<T>;

  abstract findByIdAndUpdate<T>(
    _id: Types.ObjectId,
    update: UpdateQuery<T>,
    returnError: boolean,
  ): Promise<T>;

  abstract findAll<T>(FilterQuery: FilterQuery<T>): Promise<T[]>;
}
