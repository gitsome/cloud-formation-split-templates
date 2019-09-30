const validateFinalTemplate = (callback) => {
    const { stack } = this.options;
    const cloudformation = new AWS.CloudFormation({
      apiVersion: '2010-05-15',
      region: stack.region,
    });

    cloudformation.validateTemplate({ TemplateBody: JSON.stringify(this.output.template, '', 4) }, (err) => {
      if (err) {
        this.log.error(`├─ ${err.message}`, false);
        this.log.error(`└─ RequestId: ${err.requestId}`, false);
        this.log.stop();
        process.exit(1);
      } else {
        callback();
      }
    });
  };