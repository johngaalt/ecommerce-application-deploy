module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  moduleNameMapper: {
    '^components/(.*)$': '<rootDir>/src/modules/UI/components/$1',
    '^gameState/(.*)$': '<rootDir>/src/modules/GameState/$1',
    '^utils/(.*)$': '<rootDir>/src/modules/Utils/$1',
    '^eventBus/(.*)$': '<rootDir>/src/modules/EventBus/$1',
  },
};
