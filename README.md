# cloud-formation-split-templates

Allows CloudFormation templates to be split into multiple files. Based on build task from cfpack.js

```javascript

const cloudFormationBuilder = require('cloud-formation-split-templates');

cloudFormationBuilder.build({
  templatesPath: './src/templates',
  outputPath: './build',
  outputFileName: 'cloudformation.json',
  validate: false
}).then(() => {
  console.log("yay!");
});

```
