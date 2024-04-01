import { NotFoundException } from '@nestjs/common';
import {
    Connection,
    FilterQuery,
    Model,
    PipelineStage,
    SaveOptions,
    Types,
    UpdateQuery,
} from 'mongoose';
import { LoggerService } from 'src/shared/utils/logger/logger.service';
import { AbstractDocument } from './abstract.schema';

export abstract class AbstractRepository<TDocument extends AbstractDocument> {
    protected abstract readonly logger: LoggerService;

    constructor(
        protected readonly model: Model<TDocument>,
        private readonly connection: Connection,
    ) {}

    async aggregate(aggregateOptions: PipelineStage[]): Promise<TDocument[]> {
        return await this.model.aggregate(aggregateOptions).exec();
    }

    async create(document: Omit<TDocument, '_id'>, options?: SaveOptions): Promise<TDocument> {
        const documentToSave = await new this.model({
            ...document,
            _id: new Types.ObjectId(),
        });
        return (await documentToSave.save(options)).toObject();
    }

    async deleteById(_id: Types.ObjectId): Promise<void> {
        await this.model.deleteOne({ _id });
    }

    // eslint-disable-next-line  @typescript-eslint/no-explicit-any
    async deleteOne(field: any, value: string): Promise<void> {
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
    ): Promise<TDocument[] | AbstractDocument> {
        return await this.model
            .find(FilterQuery)
            .populate(collection, fields)
            .sort(sortByField ? sortByField : null)
            .exec();
    }

    async findOneWithPopulate(
        collection: string,
        fields: string,
        FilterQuery?: FilterQuery<TDocument>,
        sortByField?: string,
    ): Promise<TDocument | AbstractDocument> {
        return await this.model
            .findOne(FilterQuery)
            .populate(collection, fields)
            .sort(sortByField ? sortByField : null)
            .exec();
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
    ): Promise<TDocument> {
        const document: TDocument | null = await this.model.findOneAndUpdate(FilterQuery, update, {
            upsert: true,
            new: true,
        });
        if (!document && returnError) throw new NotFoundException('Document does not exists');
        return document;
    }
}
