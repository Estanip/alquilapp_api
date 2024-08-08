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

export class MongooseRepository<TDocument extends Document> {
  constructor(protected readonly model: Model<TDocument>) {}

  async aggregate(aggregateOptions: PipelineStage[]): Promise<TDocument[]> {
    return await this.model.aggregate(aggregateOptions).exec();
  }

  async create(document: Partial<TDocument>, options?: SaveOptions): Promise<TDocument> {
    const documentToSave = await new this.model({
      ...document,
      _id: new Types.ObjectId(),
    });
    return (await documentToSave.save(options)).toObject();
  }

  async deleteById(_id: Types.ObjectId): Promise<void> {
    await this.model.findByIdAndDelete(_id);
  }

  // eslint-disable-next-line  @typescript-eslint/no-explicit-any
  async deleteOne(field: any, value: any): Promise<void> {
    await this.model.deleteOne({ [field]: value });
  }

  async findById(_id: Types.ObjectId, returnError: boolean = false): Promise<TDocument> {
    const document: TDocument | null = await this.model.findById(_id).lean();
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }

  async findOne(
    FilterQuery: FilterQuery<TDocument>,
    returnError: boolean = false,
  ): Promise<TDocument> {
    const document: TDocument | null = await this.model.findOne(FilterQuery, {});
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }

  async findOneAndUpdate(
    FilterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    returnError: boolean = false,
  ): Promise<TDocument> {
    const document: TDocument | null = await this.model.findOneAndUpdate(FilterQuery, update, {
      new: true,
    });
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }

  async findByIdAndUpdate(
    _id: Types.ObjectId,
    update: UpdateQuery<TDocument>,
    returnError: boolean = false,
  ): Promise<TDocument> {
    const document: TDocument | null = await this.model.findByIdAndUpdate(_id, update);
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }

  async findAll(FilterQuery: FilterQuery<TDocument> = {}): Promise<TDocument[]> {
    const documents: TDocument[] = await this.model.find(FilterQuery).lean();
    return documents;
  }

  async findAllWithPopulate(
    collection: string,
    fields: string,
    FilterQuery?: FilterQuery<TDocument>,
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
    FilterQuery?: FilterQuery<TDocument>,
    sortByField?: string,
  ): Promise<Partial<Document>> {
    return await this.model
      .findOne(FilterQuery)
      .populate(collection, fields)
      .sort(sortByField ? sortByField : null)
      .exec();
  }

  async upsert(
    FilterQuery: FilterQuery<TDocument>,
    update: UpdateQuery<TDocument>,
    returnError: boolean = false,
  ): Promise<TDocument> {
    const document: TDocument | null = await this.model.findOneAndUpdate(FilterQuery, update, {
      upsert: true,
      new: true,
    });
    if (!document && returnError) throw new NotFoundException('Document does not exists');
    return document;
  }
}
