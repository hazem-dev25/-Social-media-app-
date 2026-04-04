import {
    type Model,
    type PopulateOptions,
    type QueryFilter,
    type QueryOptions,
    type UpdateQuery
} from 'mongoose'

type Select = string
type Sort = string | Record<string, 1 | -1>
type Populate = string | PopulateOptions | Array<string | PopulateOptions>

interface BaseOptions {
    lean?: boolean
    populate?: Populate
    sort?: Sort
}

interface FindOptions extends BaseOptions {
    limit?: number
    skip?: number
}

interface FindOneParams<TDocument extends object> {
    filter?: QueryFilter<TDocument>
    model: Model<TDocument>
    options?: BaseOptions
    select?: Select
}

interface FindParams<TDocument extends object> {
    filter?: QueryFilter<TDocument>
    model: Model<TDocument>
    options?: FindOptions
    select?: Select
}

interface FindByIdParams<TDocument extends object> {
    id: string
    model: Model<TDocument>
    populate?: Populate
    select?: Select
}

type UpdateOptions<TDocument extends object> = Omit<QueryOptions<TDocument>, 'lean' | 'populate'> & {
    lean?: boolean
    populate?: Populate
}

interface FindByIdAndUpdateParams<TDocument extends object> {
    id: string
    model: Model<TDocument>
    options?: UpdateOptions<TDocument>
    select?: Select
    update?: UpdateQuery<TDocument>
}

interface FindByIdAndDeleteParams<TDocument extends object> {
    id: string
    model: Model<TDocument>
    options?: Omit<BaseOptions, 'sort'>
    select?: Select
}

interface InsertOneParams<TDocument extends object> {
    data: Partial<TDocument>
    model: Model<TDocument>
}

interface InsertManyParams<TDocument extends object> {
    data: Array<Partial<TDocument>>
    model: Model<TDocument>
}

export const findOne = async <TDocument extends object>({
    model,
    filter = {},
    select = '',
    options = {}
}: FindOneParams<TDocument>) => {
    const { populate, sort, lean } = options
    const query = model.findOne(filter)

    if (select) {
        query.select(select)
    }
    if (sort) {
        query.sort(sort)
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate)
        } else if (Array.isArray(populate)) {
            query.populate(populate)
        } else {
            query.populate(populate)
        }
    }

    return lean ? query.lean().exec() : query.exec()
}

export const find = async <TDocument extends object>({
    model,
    filter = {},
    select = '',
    options = {}
}: FindParams<TDocument>) => {
    const { populate, sort, limit, skip, lean } = options
    const query = model.find(filter)

    if (select) {
        query.select(select)
    }
    if (sort) {
        query.sort(sort)
    }
    if (typeof skip === 'number') {
        query.skip(skip)
    }
    if (typeof limit === 'number') {
        query.limit(limit)
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate)
        } else if (Array.isArray(populate)) {
            query.populate(populate)
        } else {
            query.populate(populate)
        }
    }

    return lean ? query.lean().exec() : query.exec()
}

export const findById = async <TDocument extends object>({
    model,
    id,
    select = '',
    populate
}: FindByIdParams<TDocument>) => {
    const query = model.findById(id)

    if (select) {
        query.select(select)
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate)
        } else if (Array.isArray(populate)) {
            query.populate(populate)
        } else {
            query.populate(populate)
        }
    }

    return query.exec()
}

export const findByIdAndUpdate = async <TDocument extends object>({
    model,
    id,
    update = {},
    select = '',
    options = {}
}: FindByIdAndUpdateParams<TDocument>) => {
    const { populate, lean, ...updateOptions } = options
    const query = model.findByIdAndUpdate(id, update, { new: true, ...updateOptions })

    if (select) {
        query.select(select)
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate)
        } else if (Array.isArray(populate)) {
            query.populate(populate)
        } else {
            query.populate(populate)
        }
    }

    return lean ? query.lean().exec() : query.exec()
}

export const findByIdAndDelete = async <TDocument extends object>({
    model,
    id,
    select = '',
    options = {}
}: FindByIdAndDeleteParams<TDocument>) => {
    const { populate, lean } = options
    const query = model.findByIdAndDelete(id)

    if (select) {
        query.select(select)
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate)
        } else if (Array.isArray(populate)) {
            query.populate(populate)
        } else {
            query.populate(populate)
        }
    }

    return lean ? query.lean().exec() : query.exec()
}

export const insertOne = async <TDocument extends object>({
    model,
    data
}: InsertOneParams<TDocument>) => {
    return model.create(data)
}

export const insertMany = async <TDocument extends object>({
    model,
    data
}: InsertManyParams<TDocument>) => {
    return model.insertMany(data)
}
