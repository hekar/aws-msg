#!/usr/bin/env node

'use strict';

const _ = require('lodash');
const co = require('co');
const aws = require('aws-sdk');
const bluebird = require('bluebird');
const asciify = bluebird.promisify(require('asciify'));
const yargs = require('yargs');
const publish = require('./publish');

function* main(args) {
  if (_.includes(args, '-h')) {
    console.log(yield asciify('aws-msg', { font: 'larry3d' }));
  }

  const argv = yargs
    .usage([
      'Usage: $0',
      '--region',
      '<region>',
      '--to',
      '<to>',
      '--to-url',
      '<to-url>',
      '--access-key-id',
      '<access-key-id>',
      '--secret-access-key',
      '<secret-access-key>'
    ].join(' '))

    .count('verbose')
    .alias('v', 'verbose')
    .describe('v')

    .demand('access-key-id')
    .describe('access-key-id', 'AWS Access Key')
    .nargs('access-key-id', 1)

    .demand('secret-access-key')
    .describe('secret-access-key', 'AWS Secret Key')
    .nargs('secret-access-key', 1)

    .demand('region')
    .describe('region', 'AWS Region')
    .nargs('region', 1)

    .demand('to')
    .describe('to', 'choose sns or sqs')
    .choices('to', ['sns', 'sqs'])

    .demand('to-url')
    .describe('to-url', 'SQS URL or SNS ARN')
    .nargs('to-url', 1)

    .describe('content', 'Message contents through command line')
    .nargs('content', 1)

    .describe('content-file', 'Message contents from file or http(s) resource')
    .nargs('content-file', 1)

    .describe('sqs-delay-seconds', '"Delay Seconds" for SQS messages')
    .nargs('sqs-delay-seconds', 1)

    .describe('sns-raw', 'Raw SNS message')

    .describe('sns-subject', 'Raw SNS message')

    .epilog('More details: https://github.com/hekar/aws-msg')

    .argv;

  if (_.includes(args, '--content') ||
      _.includes(args, '--content-file')) {
    console.log(argv);
    yield publish(aws, argv);
  } else {
    throw new Error('Requires `--content` or `--content-file`');
  }
}

co(main.bind({}, process.argv))
  .catch((err) => {
    console.error(err.stack);
    process.exit(127);
  });
