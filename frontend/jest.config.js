/** @type {import('jest').Config} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '/.next/'],
    moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/$1'
    },
    globals: {
        'ts-jest': {
            tsconfig: 'tsconfig.jest.json'
        }
    }
}
