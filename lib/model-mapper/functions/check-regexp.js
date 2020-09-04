exports.checkRegexp = async function (value, key, mapModelSpec) {
    if (!mapModelSpec.regExp) return value;

    if (mapModelSpec.regExp.test(value)) return value;

    throw ModelMapperError.createFromModelSpec(key, mapModelSpec)
}