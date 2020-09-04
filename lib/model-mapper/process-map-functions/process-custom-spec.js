async function processCustomSpec(sourceObject, key, mapModelSpec) {
    if (mapModelSpec.map) {
        if (mapModelSpec.map instanceof Function)
            return await Promise.resolve(mapModelSpec.map(sourceObject, key, mapModelSpec));
        return Promise.resolve(mapModelSpec.map);
    }
    
    throw new ModelMapperError('Did not pass a map function to a custom map specification');
}

exports.processCustomSpec = processCustomSpec;
