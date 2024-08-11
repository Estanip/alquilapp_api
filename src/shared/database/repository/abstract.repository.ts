import { Filter } from 'src/shared/database/interfaces';

export abstract class AbstractDatabaseRepository<T, F = Filter<T>> {
  abstract create(item: T): Promise<T>;

  abstract deleteById(_id: string): Promise<void>;

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  abstract deleteOne(field: any, value: any): Promise<void>;

  abstract findAll(filterQuery: F): Promise<T[]>;

  abstract findById(id: string): Promise<T | null>;

  abstract findOne(filterQuery: F): Promise<T>;

  abstract findByIdAndUpdate(id: string, item: Partial<T>): Promise<T>;
}
