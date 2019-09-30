const findTemplates = require('./findTemplates');
const processTemplates = require('./processTemplates');
const validateFinalTemplate = require('./validateTemplates');
const saveTemplate = require('./saveTemplate');

const build = ({templatesPath, outputPath, outputFileName, validate, awsRegion}) => {

  return new Promise((resolve, reject) => {

    console.log('Build template file...');

    console.log(`├─ Looking for templates in the ${templatesPath} folder...`);
    const files = findTemplates(templatesPath);
    if (files.length === 0) {
      console.log(`└─ No YAML files found in ${templatesPath}`);
      return resolve();
    }

    console.log('├─ Processing found templates...');
    const combinedTemplate = processTemplates(files);

    if (validate) {

      console.log('├─ Validating final template...');
      return validateFinalTemplate(combinedTemplate, awsRegion).then(() => {
        const finalFileName = saveTemplate(combinedTemplate, outputPath, outputFileName);
        console.log(`└─ Final template: ${finalFileName}\n`);
      }).then(resolve).catch(reject);

    } else {
      const finalFileName = saveTemplate(combinedTemplate, outputPath, outputFileName);
      console.log(`└─ Final template: ${finalFileName}\n`);
      resolve();
    }
  });
};

module.exports = build;