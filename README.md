# aws-msg

Simple utility to create messages in AWS SQS and SNS

## Usage

```
npm install -g aws-msg
```

```
__      __  __  __    ____             ___ ___      ____     __
/'__`\   /\ \/\ \/\ \  /',__\  _______ /' __` __`\   /',__\  /'_ `\
/\ \L\.\_ \ \ \_/ \_/ \/\__, `\/\______\/\ \/\ \/\ \ /\__, `\/\ \L\ \
\ \__/.\_\ \ \___x___/'\/\____/\/______/\ \_\ \_\ \_\\/\____/\ \____ \
\/__/\/_/  \/__//__/   \/___/           \/_/\/_/\/_/ \/___/  \/___L\  \
                                                               /\____ /
                                                               \_/__/

Usage: aws-msg --region <region> --to <to> --to-url <to-url>
--access-key-id <access-key-id> --secret-access-key <secret-access-key>

Options:
-v, --verbose                                                          [count]
--access-key-id      AWS Access Key                                 [required]
--secret-access-key  AWS Secret Key                                 [required]
--region             AWS Region                                     [required]
--to                 choose sns or sqs      [required] [choices: "sns", "sqs"]
--to-url             SQS URL or SNS ARN                             [required]
--content            Message contents through command line
--content-file       Message contents from file or http(s) resource
--sqs-delay-seconds  "Delay Seconds" for SQS messages
--sns-raw            Raw SNS message
--sns-subject        Raw SNS message

More details: https://github.com/hekar/aws-msg

```

## License
[MIT](./LICENSE)
