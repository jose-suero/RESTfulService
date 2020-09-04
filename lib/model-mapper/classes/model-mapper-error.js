exports.ModelMapperError = class ModelMapperError extends Error {
  constructor(message, key = null, mapModelSpec = null) {
      super(message);

      this.key = key;
      this.mapModelSpec = mapModelSpec;
      this.date = new Date();
      this.errorId = `${this.date.getTime()}-${Math.random() * 10000 }`;
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
