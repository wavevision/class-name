module.exports = {
  testMatch: ['<rootDir>/src/**/tests/*.test.ts'],
  testPathIgnorePatterns: ['<rootDir>/node_modules'],
  moduleDirectories: ['node_modules', 'src'],
  moduleFileExtensions: ['js', 'ts'],
  coverageDirectory: '<rootDir>/temp/coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  collectCoverageFrom: [
    'src/**/*.ts',
    '!src/index.ts',
    '!src/**/*.test.ts',
    '!**/node_modules/**',
  ],
  preset: 'ts-jest',
  globals: {
    'ts-jest': {
      isolatedModules: true,
    },
  },
};
