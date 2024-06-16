const path = require('path');
const JEST_STYLE_MOCK_FILE = path.resolve(__dirname, 'jest.style-mock.ts');
const JEST_FILE_MOCK_FILE = path.resolve(__dirname, 'jest.file-mock.ts');


module.exports = {
  preset: 'ts-jest',
  rootDir: path.resolve(__dirname, './'),
  moduleFileExtensions: ['js', 'jsx', 'vue', 'ts', 'tsx'],
  moduleNameMapper: {
    '\\.(css|less|scss)$': JEST_STYLE_MOCK_FILE,
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': JEST_FILE_MOCK_FILE,
    '^src/packages/(.*)$': '<rootDir>/packages/press-ui/src/packages/$1',
    '^src/pages/(.*)$': '<rootDir>/packages/press-ui/src/pages/$1',
    '^src/utils/(.*)$': '<rootDir>/packages/press-ui/src/utils/$1',
  },
  transform: {
    '\\.(vue)$': 'vue-jest',

    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '^.+\\.(j|t)sx?$': 'ts-jest',
  },
  // transform: {
  //   '^.+\\.[t|j]sx?$': [
  //     'babel-jest',
  //     {
  //       presets: ['@babel/preset-env', '@babel/preset-typescript'],
  //     },
  //   ],
  // },
  globals: {
    uni: true,
    getCurrentPages: true,
    ROUTES: '',
    weex: { requireModule: () => {} },
  },
  testMatch: [
    '**/tests/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)',
  ],
  testEnvironment: 'jsdom',
  snapshotSerializers: ['jest-serializer-vue'],
  collectCoverage: true,
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: '<rootDir>/tests/coverage',
};
