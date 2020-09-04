exports.checkLength = async function (value, key, mapModelSpec) {
    //Minlength
    if (mapModelSpec.minLength) {
        const [length, message] = Array.isArray(mapModelSpec.minLength) ?
            mapModelSpec.minLength
            :
            [mapModelSpec.minLength, `The value '${value}' must have ${mapModelSpec.minLength} characters or more`];

        if (isNaN(length)) throw ModelMapperError.createFromModelSpec(key, mapModelSpec, 'Invalid length provided for minLength parameter.');

        if (value.length < length) throw ModelMapperError.createFromModelSpec(key, mapModelSpec, message.toString());
    }

    //Maxlength
    if (mapModelSpec.maxLength) {
        const [length, message] = Array.isArray(mapModelSpec.maxLength) ?
            mapModelSpec.maxLength
            :
            [mapModelSpec.maxLength, `The value '${value}' must have ${mapModelSpec.maxLength} characters or less`];

        if (isNaN(length)) throw ModelMapperError.createFromModelSpec(key, mapModelSpec, 'Invalid length provided for maxLength parameter.');

        if (value.length > length) throw ModelMapperError.createFromModelSpec(key, mapModelSpec, message.toString());
    }
}