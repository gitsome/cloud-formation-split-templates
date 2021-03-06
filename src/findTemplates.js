const fs = require('fs-extra');
const path = require('path');
const chalk = require('chalk');

const isValidTemplateFileRegex = /\.(json|yaml)$/i;

const isValidTemplateFile = (filename) => {
  return isValidTemplateFileRegex.test(filename);
};

const walkTemplates =(dir, list) => {
  let newlist = [...list];

  fs.readdirSync(dir).forEach((file) => {
    const filename = path.join(dir, file);
    if (fs.statSync(filename).isDirectory()) {
      newlist = [...newlist, ...walkTemplates(filename, list)];
    } else if (isValidTemplateFile(filename)) {
      newlist.push(filename);
    }
  });

  return newlist;
}

const findTemplates = (templatePath) => {

  const entryPath = path.isAbsolute(templatePath)
    ? templatePath
    : path.resolve(process.cwd(), templatePath);

  if (!fs.existsSync(entryPath)) {
    console.log(chalk.red('The entry folder is not found.'));
  }

  const files = walkTemplates(entryPath, []);
  if (files.length > 0) {
    console.log(`├─ Found ${files.length} template(s)...`);
  } else {
    console.log('└─ Found no templates in the folder...');
  }

  return files;
};

module.exports = findTemplates;