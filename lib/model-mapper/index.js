const { ModelMapperError, errorMiddleware } = require('./classes/model-mapper-error');
const { NotImplementedModelMapperError } = require('./classes/not-implemented-model-mapper-error');
const { processDirectSpec } = require('./process-map-functions/process-direct-spec');
const { processCustomSpec } = require('./process-map-functions/process-custom-spec');
const { processNumberSpec } = require('./process-map-functions/process-number-spec');
const { processDateSpec } = require('./process-map-functions/process-date-spec');

async function processMapSpec(sourceObject, key, mapModelSpec) {
    try {
        if (mapModelSpec && mapModelSpec.type) {
            switch (mapModelSpec.type) {
                case 'direct':
                    return await processDirectSpec(sourceObject, key, mapModelSpec);
                case 'custom':
                    return await processCustomSpec(sourceObject, key, mapModelSpec);
                case 'number':
                    return await processNumberSpec(sourceObject, key, mapModelSpec);
                case 'date':
                    return await processDateSpec(sourceObject, key, mapModelSpec);
                default:
                    throw new NotImplementedModelMapperError(`The model mapper type '${mapModelSpec.type}' is not implemented.`);
            }
        }
    } catch (err) {
        if (err instanceof ModelMapperError) throw err;
        console.log(err);
        throw new ModelMapperError(err.Message);
    }
}

async function map(sourceObject, mapModel) {
    const result = {};

    for (key in mapModel) {
        result[key] = await processMapSpec(sourceObject, key, mapModel[key]);
    }

    return result;

}

const middleware = (model) => async (req, res, next) => {
    try {
        req.model = await map(req.body, model);
        next();
    } catch (err) {
        next(err);
    }
}

exports.map = map;
exports.middleware = middleware;
exports.ModelMapperError = ModelMapperError;
exports.NotImplementedModelMapperError = NotImplementedModelMapperError;
exports.errorMiddleware = errorMiddleware;