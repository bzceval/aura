module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', ['feat', 'fix', 'refactor']],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'header-case': [2, 'always', 'lower-case'],
  },
};
