const chalk = require('chalk');
const yaml = require('js-yaml');
const fs = require('fs-extra');
const intrinsicFunctions = require('./intrinsicFunctionsSchema.js');

const processTemplate = (file, callBack) => {
  const content = fs.readFileSync(file, 'utf8');

  try {

    const doc = content.trim(0).charAt(0) === '{'
      ? JSON.parse(content)
      : yaml.safeLoad(content, { schema: intrinsicFunctions });

    callBack(null, doc);

  } catch (e) {
    callBack(e, null);
  }
};

const processTemplates = (files) => {
  const template = {};

  files.forEach((file) => {

    processTemplate(file, (err, doc) => {

      if (!doc) {
        const error = err.toString().split('\n').join('\n│  ');
        console.log(chalk.red(`├─ Error processing ${file} template: ${error}`));
        return;
      }

      console.log(`├─ Processed ${file} template...`);

      Object.keys(doc).forEach((group) => {
        if (typeof doc[group] === 'object') {
          if (doc[group].constructor.name === 'Date') {
            const [dateString] = doc[group].toISOString().split('T');
            template[group] = dateString;
          } else {
            if (!template[group]) {
              template[group] = {};
            }

            Object.keys(doc[group]).forEach((key) => {
              template[group][key] = doc[group][key];
            });
          }
        } else {
          template[group] = doc[group];
        }
      });
    });

  });

  return template;
};

module.exports = processTemplates;
