const findTemplates = require('./findTemplates');
const processTemplates = require('./processTemplates');
const validateFinalTemplate = require('./validateTemplates');
const saveTemplate = require('./saveTemplate');

const build = ({templatesPath, outputPath, outputFileName, validate}) => {

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
      return validateFinalTemplate(combinedTemplate).then(() => {
        saveTemplate(outputPath, outputFileName);
        console.log(`└─ Final template: ${this.output.templateFile}\n`);
      }).then(resolve).catch(reject);

    } else {
      saveTemplate(outputPath, outputFileName);
      console.log(`└─ Final template: ${this.output.templateFile}\n`);
      resolve();
    }
  });
};

module.exports = build;