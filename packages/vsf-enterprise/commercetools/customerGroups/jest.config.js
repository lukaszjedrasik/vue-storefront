module.exports = {
  transform: {
    '^.+\\.(ts)$': 'ts-jest'
  },
  coverageReporters: ['html', 'lcov', 'text'],
  watchPathIgnorePatterns: ['/node_modules/']
};
