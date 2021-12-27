module.exports = {
  roots: ['<rootDir>/'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  coverageReporters: ['lcov', 'text', 'text-summary'],
  testMatch: ['(/__tests__/.*/.*(test|spec))\\.ts?$', '**/?(*.)(spec|test).ts'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  coveragePathIgnorePatterns: ['index.ts'],
  testPathIgnorePatterns: ['test/helpers/'],
  collectCoverageFrom: ['src/controllers/**/*.ts'],
}
