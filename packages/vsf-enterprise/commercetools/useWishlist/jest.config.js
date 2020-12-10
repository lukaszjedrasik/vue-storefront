module.exports = {
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  coverageReporters: ['html', 'lcov', 'text'],
  watchPathIgnorePatterns: ['/node_modules/'],
  testMatch: ['<rootDir>/**/__tests__/**/*spec.[jt]s?(x)']
};
