const { ModelMapperError } = require('../classes/model-mapper-error');
const { Model } = require('mongoose');
const { checkRequired } = require('./check-required');
const { checkRegexp } = require('./check-regexp');
const { checkLength } = require('./check-length');

async function processDirectSpec(sourceObject, key, mapModelSpec) {
    const preValue = sourceObject[(mapModelSpec.from && mapModelSpec.from.toString()) || (key)];
    await checkRequired(preValue, key, mapModelSpec);
    await checkRegexp(preValue, key, mapModelSpec);
    await checkLength(preValue, key, mapModelSpec);
    return preValue;
}

exports.processDirectSpec = processDirectSpec;
exports.checkRegexp = checkRegexp;
