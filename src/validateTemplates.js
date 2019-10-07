const AWS = require('aws-sdk');
const chalk = require('chalk');

const validateFinalTemplate = (template, region) => {

  return new Promise((resolve, reject) => {

    const cloudformation = new AWS.CloudFormation({
      apiVersion: '2010-05-15',
      region: region,
    });

    cloudformation.validateTemplate({TemplateBody: JSON.stringify(template, '', 4) }, (err) => {
      if (err) {
        console.log(chalk.red(`├─ ${err.message}`), false);
        console.log(`└─ RequestId: ${err.requestId}`, false);
        process.exit(1);
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

module.exports = validateFinalTemplate;