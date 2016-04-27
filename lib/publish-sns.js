'use strict';

const bluebird = require('bluebird');

/**
 * publishSns -
 *
 * @param  {object} sns
 * Initialized AWS.SNS(...) object
 * @param  {object} params
 * {
 *   "content": (string) - JSON content
 *   "toUrl": (string) - TopicArn
 *   "snsSubject": (string) - Subject
 *   "snsRaw" (boolean) - Is the message raw
 *   "attributes": (object)
 * }
 * @returns {object}
 *  Message that was published
 */
function* publishSns(sns, params) {
  const publishParams = {
    Message: params.content,
    MessageAttributes: params.attributes,
    MessageStructure: 'json',
    Subject: params.snsSubject,
    TopicArn: params.toUrl
  };

  return yield bluebird.promisify(sns.publish.bind(sns))(publishParams);
}

module.exports = publishSns;
