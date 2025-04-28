
const { writeDocSidebar } = require('./1.docs-sidebar');
const { writeDemoIndexConfig } = require('./2.demo-index');
const { writeDemoPagesJson } = require('./3.demo-pages');

const { writeDemoTitleI18n } = require('./4.demo-title');
const { writeBuildConfig } = require('./5.build-config');
const { updateDocsData } = require('./6.docs-url');
const {
  writeSrcIndexJs,
} = require('./generate-entry');

const { PATH_MAP } = require('./helper');


function generateComponentConfig({
  componentConfig,
  scssPath,
  globMatch,
  targetDir,
  needAct = false,
}) {
  writeDocSidebar(componentConfig);
  writeDemoIndexConfig(componentConfig);
  writeDemoPagesJson(componentConfig, needAct);

  writeDemoTitleI18n(componentConfig);
  writeBuildConfig(componentConfig);
  updateDocsData(componentConfig, targetDir);

  writeSrcIndexJs({
    componentConfig,
    filePath: PATH_MAP.SRC_INDEX,
    allComponent: true,
    scssPath,
    globMatch,
    targetDir,
  });
}

module.exports = {
  generateComponentConfig,
};
