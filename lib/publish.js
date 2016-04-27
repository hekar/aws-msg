'use strict';

const _ = require('lodash');
const fs = require('fs');
const bluebird = require('bluebird');
const publishSns = require('./publish-sns');
const publishSqs = require('./publish-sqs');


/**
 * publish - Publish message through SNS or SQS
 *
 * @param  {object} params
 * {
 *  // ...
 * }
 * @returns {object}
 * Result from AWS (different depending on SNS or SQS)
 */
function* publish(aws, params) {

  function selectPublish(aws, region, to) {
    const credentials = {
      accessKeyId: params.accessKeyId,
      secretAccessKey: params.secretAccessKey
    };

    const construct = { region, credentials };
    if (to === 'sns') {
      return _.partial(publishSns, new aws.SNS(construct));
    } else {
      return _.partial(publishSqs, new aws.SQS(construct));
    }
  }

  let content = null;
  // Read contents
  if (params.content) {
    content = params.content;
  } else if (params.contentFile) {
    if (!bluebird.promisify(fs.exists.bind(fs))(params.contentFile)) {
      throw new Error(`Do not have permissions or file does not exist. ${params.contentFile}`);
    }

    content = yield bluebird.promisify(fs.readFile.bind(fs))(params.contentFile);
  } else {
    throw new Error('Missing `params.content` or `params.contentFile`');
  }

  const publishParameters = _.assign({}, params, { content });
  return yield selectPublish(
    aws, params.region, params.to)(publishParameters);
}

module.exports = publish;
