'use strict';

const bluebird = require('bluebird');

/**
 * publishSqs -
 *
 * @param  {object} sqs
 * Initialized AWS.SQS(...) object
 * @param  {object} params
 * {
 *   "content": (string)
 *   "toUrl": (string)
 *   "sqsDelaySeconds": (number)
 *   "attributes": (object)
 * }
 * @returns {object}
 *  Message that was published
 */
function* publishSqs(sqs, params) {
  const sendParams = {
    MessageBody: params.content,
    QueueUrl: params.toUrl,
    DelaySeconds: params.sqsDelaySeconds,
    MessageAttributes: params.attributes
  };

  return yield bluebird.promisify(sqs.sendMessage.bind(sqs))(sendParams);
}

module.exports = publishSqs;
