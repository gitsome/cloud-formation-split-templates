const fs = require('fs-extra');
const path = require('path');

const walkTemplates =(dir, list) => {
  let newlist = [...list];

  fs.readdirSync(dir).forEach((file) => {
    const filename = path.join(dir, file);
    if (fs.statSync(filename).isDirectory()) {
      newlist = [...newlist, ...this.walkTemplates(filename, list)];
    } else {
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
    this.log.error('The entry folder is not found.');
  }

  const files = walkTemplates(entryPath, []);
  if (files.length > 0) {
    this.log.info(`├─ Found ${files.length} template(s)...`);
  } else {
    this.log.info('└─ Found no templates in the folder...');
  }

  return files;
};

module.exports = findTemplates;