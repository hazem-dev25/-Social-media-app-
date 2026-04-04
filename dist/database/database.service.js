"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.insertMany = exports.insertOne = exports.findByIdAndDelete = exports.findByIdAndUpdate = exports.findById = exports.find = exports.findOne = void 0;
const findOne = async ({ model, filter = {}, select = '', options = {} }) => {
    const { populate, sort, lean } = options;
    const query = model.findOne(filter);
    if (select) {
        query.select(select);
    }
    if (sort) {
        query.sort(sort);
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate);
        }
        else if (Array.isArray(populate)) {
            query.populate(populate);
        }
        else {
            query.populate(populate);
        }
    }
    return lean ? query.lean().exec() : query.exec();
};
exports.findOne = findOne;
const find = async ({ model, filter = {}, select = '', options = {} }) => {
    const { populate, sort, limit, skip, lean } = options;
    const query = model.find(filter);
    if (select) {
        query.select(select);
    }
    if (sort) {
        query.sort(sort);
    }
    if (typeof skip === 'number') {
        query.skip(skip);
    }
    if (typeof limit === 'number') {
        query.limit(limit);
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate);
        }
        else if (Array.isArray(populate)) {
            query.populate(populate);
        }
        else {
            query.populate(populate);
        }
    }
    return lean ? query.lean().exec() : query.exec();
};
exports.find = find;
const findById = async ({ model, id, select = '', populate }) => {
    const query = model.findById(id);
    if (select) {
        query.select(select);
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate);
        }
        else if (Array.isArray(populate)) {
            query.populate(populate);
        }
        else {
            query.populate(populate);
        }
    }
    return query.exec();
};
exports.findById = findById;
const findByIdAndUpdate = async ({ model, id, update = {}, select = '', options = {} }) => {
    const { populate, lean, ...updateOptions } = options;
    const query = model.findByIdAndUpdate(id, update, { new: true, ...updateOptions });
    if (select) {
        query.select(select);
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate);
        }
        else if (Array.isArray(populate)) {
            query.populate(populate);
        }
        else {
            query.populate(populate);
        }
    }
    return lean ? query.lean().exec() : query.exec();
};
exports.findByIdAndUpdate = findByIdAndUpdate;
const findByIdAndDelete = async ({ model, id, select = '', options = {} }) => {
    const { populate, lean } = options;
    const query = model.findByIdAndDelete(id);
    if (select) {
        query.select(select);
    }
    if (populate) {
        if (typeof populate === 'string') {
            query.populate(populate);
        }
        else if (Array.isArray(populate)) {
            query.populate(populate);
        }
        else {
            query.populate(populate);
        }
    }
    return lean ? query.lean().exec() : query.exec();
};
exports.findByIdAndDelete = findByIdAndDelete;
const insertOne = async ({ model, data }) => {
    return model.create(data);
};
exports.insertOne = insertOne;
const insertMany = async ({ model, data }) => {
    return model.insertMany(data);
};
exports.insertMany = insertMany;
