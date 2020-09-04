class ModelMapperError extends Error {
    constructor(message, key = null, mapModelSpec = null) {
        super(message);

        this.key = key;
        this.mapModelSpec = mapModelSpec;
    }

    static createFromModelSpec(key, mapModelSpec, message = null) {
        return new ModelMapperError(
            (message && message.toString())
            || (mapModelSpec.errorMessage && mapModelSpec.errorMessage.toString())
            || `Model validation error at path '${key}'`,
            key,
            mapModelSpec
        );
    }
}
exports.ModelMapperError = ModelMapperError;

exports.errorMiddleware = (mapError) => async function (err, req, res, next) {
    if (err && err instanceof ModelMapperError) {
        if (mapError) {
            try {
                await Promise.resolve(mapError(
                    err,
                    req,
                    res,
                    next
                ));
            } catch (err) {
                next(err);
            }
        } else {
            return res.status(400).json({
                error: err.message,
                key: err.key,
                specs: err.mapModelSpec
            });
        }
    }
}