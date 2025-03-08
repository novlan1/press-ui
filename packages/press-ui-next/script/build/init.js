const { execCommand } = require('t-comm');

const PACKAGE_DIR = 'src/';
const SOURCE_DIR = 'node_modules/press-ui/';

const commandList = [
  `rm -rf ${PACKAGE_DIR} \
  && mkdir -p ${PACKAGE_DIR} \
  && cp -r ${SOURCE_DIR}* ${PACKAGE_DIR} \
  && rm -rf ${PACKAGE_DIR}/node_modules
  `,

  // `rm -rf README.md \
  //  && cp ${SOURCE_DIR}README.md .
  // `,

  `rm -rf CHANGELOG.md \
   && cp ${SOURCE_DIR}CHANGELOG.md .
  `,
];

function main() {
  commandList.forEach((command) => {
    execCommand(command, process.cwd(), {
      stdio: 'inherit',
    });
  });
}

main();
