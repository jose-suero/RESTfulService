const { ModelMapperError } = require('lib/model-mapper');
const { checkLength } = require('./check-length');
const { checkRequired } = require('./check-required');


async function processCustomSpec(sourceObject, key, mapModelSpec) {
    if (mapModelSpec.map) {


        const value = mapModelSpec.map instanceof Function ?
            Promise.resolve(mapModelSpec.map(sourceObject, key, mapModelSpec))
            : Promise.resolve(mapModelSpec.map);

        await checkRequired(await value, key, mapModelSpec);
        return await checkLength(await value, key, mapModelSpec);
    }

    throw new ModelMapperError(
        'A map function was not provided.',
        key,
        mapModelSpec);
}

exports.processCustomSpec = processCustomSpec;
