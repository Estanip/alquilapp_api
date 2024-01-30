import { NotFoundException } from '@nestjs/common';
import {
    Connection,
    FilterQuery,
    Model,
    SaveOptions,
    Types,
    UpdateQuery
} from 'mongoose';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: LoggerService;

    constructor(
        protected readonly model: Model<TDocument>,
        private readonly connection: Connection,
    ) {}

    async aggregate(aggregateOptions: any): Promise<TDocument[]> {
        return await this.model.aggregate(aggregateOptions).exec();
    }

    async create(
        document: Omit<TDocument, '_id'>,
        options?: SaveOptions,
    ): Promise<TDocument | unknown> {
        const documentToSave = await new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return await documentToSave.save(options);
    }

    async deleteById(_id: string): Promise<void> {
        await this.model.deleteOne({ _id });
    }

    async findById(_id: string, returnError: boolean = false): Promise<TDocument | unknown> {
        const document = await this.model.findById(_id).lean();
        if (!document && returnError) throw new NotFoundException('Document does not exists');
        return document;
    }

    async findOne(
        FilterQuery: FilterQuery<TDocument>,
        returnError: boolean = false,
    ): Promise<TDocument | unknown> {
        const document = await this.model.findOne(FilterQuery, {});
        if (!document && returnError) throw new NotFoundException('Document does not exists');
        return document;
    }

    async findOneAndUpdate(
        FilterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
        returnError: boolean = false,
    ): Promise<TDocument | unknown> {
        const document = await this.model.findOneAndUpdate(FilterQuery, update, {
            lean: true,
            new: true,
        });
        if (!document && returnError) throw new NotFoundException('Document does not exists');
        return document;
    }

    async findByIdAndUpdate(
        _id: string,
        update: UpdateQuery<TDocument>,
        returnError: boolean = false,
    ): Promise<TDocument | unknown> {
        const document = await this.model.findByIdAndUpdate(_id, update).lean();
        if (!document && returnError) throw new NotFoundException('Document does not exists');
        return document;
    }

    async findAll(FilterQuery: FilterQuery<TDocument> = {}): Promise<TDocument[]> {
        const documents: TDocument[] | [] = await this.model.find(FilterQuery).lean();
        return documents;
    }

    async findAllWithPopulate(collection: string, fields: string) {
        return await this.model.find().populate(collection, fields).exec();
    }

    async startTransaction() {
        const session = await this.connection.startSession();
        session.startTransaction();
        return session;
    }

    async upsert(
        FilterQuery: FilterQuery<TDocument>,
        update: UpdateQuery<TDocument>,
        returnError: boolean = false,
    ): Promise<TDocument | unknown> {
        const document = await this.model.findOneAndUpdate(FilterQuery, update, {
            lean: true,
            upsert: true,
            new: true,
        });
        if (!document && returnError) throw new NotFoundException('Document does not exists');
        return document;
    }
}
