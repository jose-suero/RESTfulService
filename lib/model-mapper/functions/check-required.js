const { ModelMapperError } = require('../../model-mapper/classes/model-mapper-error');

exports.checkRequired = async function(value, key, mapModelSpec) {
    if (mapModelSpec.required) {
        const [required, message] = Array.isArray(mapModelSpec.required) ?
            mapModelSpec.required
            :
            [mapModelSpec.required, `The value at '${key}' is required!`];

        if (required && (!value))
            throw ModelMapperError.createFromModelSpec(key, mapModelSpec, message.toString());
    }
}