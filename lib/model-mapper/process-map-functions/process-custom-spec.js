const { ModelMapperError } = require('lib/model-mapper');

async function processCustomSpec(sourceObject, key, mapModelSpec) {
    if (mapModelSpec.map) {
        if (mapModelSpec.map instanceof Function)
            return await Promise.resolve(mapModelSpec.map(sourceObject, key, mapModelSpec));
            
        return Promise.resolve(mapModelSpec.map);
    }

    throw new ModelMapperError(
        'A map function was not',
        key,
        mapModelSpec);
}

exports.processCustomSpec = processCustomSpec;
