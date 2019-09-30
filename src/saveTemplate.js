const fs = require('fs-extra');
const path = require('path');

const saveFinalTemplate = (template, outputPath, outputFileName) => {

  let rootPath;

  if (path.isAbsolute(outputPath)) {
    rootPath = outputPath;
  } else {
    rootPath = path.resolve(process.cwd(), outputPath);
  }

  const finalOutputFileName = outputFileName ? outputFileName : 'cloudformation-template.json';

  let filename = path.join(rootPath, finalOutputFileName);

  const data = JSON.stringify(template, '', 4);
  fs.writeFileSync(filename, data, { encoding: 'utf8' });
  return filename;
};

module.exports = saveFinalTemplate;