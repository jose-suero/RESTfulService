const { processMapSpec } = require('../functions/process-map-spec');

exports.map = async function (sourceObject, mapModel) {
  const result = {};

  for (key in mapModel) {
    result[key] = await processMapSpec(sourceObject, key, mapModel[key]);
  }

  return result;
};