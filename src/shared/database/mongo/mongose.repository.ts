import { NotFoundException } from '@nestjs/common';
import {
  Document,
  FilterQuery,
  Model,
  PipelineStage,
  SaveOptions,
  Types,
  UpdateQuery,
} from 'mongoose';
import { AbstractDatabaseRepository } from 'src/shared/database/repository/abstract.repository';

export class MongooseRepository<T extends Document>
  implements AbstractDatabaseRepository<T, FilterQuery<T>>
{
  constructor(protected readonly model: Model<T>) {}

  async aggregate(aggregateOptions: PipelineStage[]): Promise<T[]> {
    return await this.model.aggregate(aggregateOptions).exec();
  }

  async create(document: Partial<T>, options?: SaveOptions): Promise<T> {
    const documentToSave = await new this.model(document);
    return (await documentToSave.save(options)).toObject();
  }

  async deleteById(_id: string): Promise<void> {
    await this.model.findByIdAndDelete(new Types.ObjectId(_id));
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  async deleteOne(field: any, value: any): Promise<void> {
    await this.model.deleteOne({ [field]: value });
  }

  async findById(_id: string, returnError: boolean = false): Promise<T> {
    const document: T | null = await this.model.findById(new Types.ObjectId(_id)).lean();
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }

  async findOne(filterQuery: FilterQuery<T>, returnError: boolean = false): Promise<T> {
    const document: T | null = await this.model.findOne(filterQuery, {});
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }

  async findOneAndUpdate(
    FilterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
    returnError: boolean = false,
  ): Promise<T> {
    const document: T | null = await this.model.findOneAndUpdate(FilterQuery, update, {
      new: true,
    });
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }

  async findByIdAndUpdate(
    _id: string,
    update: UpdateQuery<T>,
    returnError: boolean = false,
  ): Promise<T> {
    const document: T | null = await this.model.findByIdAndUpdate(new Types.ObjectId(_id), update);
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }

  async findAll(filterQuery: FilterQuery<T> = {}): Promise<T[]> {
    const documents: T[] = await this.model.find(filterQuery).lean();
    return documents;
  }

  async findAllWithPopulate(
    collection: string,
    fields: string,
    FilterQuery?: FilterQuery<T>,
    sortByField?: string,
  ): Promise<Partial<Document>> {
    return await this.model
      .find(FilterQuery)
      .populate(collection, fields)
      .sort(sortByField ? sortByField : null)
      .lean();
  }

  async findOneWithPopulate(
    collection: string,
    fields: string,
    FilterQuery?: FilterQuery<T>,
    sortByField?: string,
  ): Promise<Partial<Document>> {
    return await this.model
      .findOne(FilterQuery)
      .populate(collection, fields)
      .sort(sortByField ? sortByField : null)
      .exec();
  }

  async upsert(
    FilterQuery: FilterQuery<T>,
    update: UpdateQuery<T>,
    returnError: boolean = false,
  ): Promise<T> {
    const document: T | null = await this.model.findOneAndUpdate(FilterQuery, update, {
      upsert: true,
      new: true,
    });
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }
}
