module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: ['@vue/prettier', 'plugin:vue/base'],
  rules: {
    'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'import/extensions': 0,
    'vue/max-attributes-per-line': [
      4,
      {
        singleline: 6,
        multiline: {
          max: 1,
          allowFirstLine: false,
        },
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    semi: 0,
    'import/no-cycle': 0,
    'max-len': 0,
    'no-underscore-dangle': 0,
    'prefer-destructuring': [
      'error',
      {
        object: true,
        array: false,
      },
    ],
    'no-param-reassign': [
      'error',
      {
        props: false,
      },
    ],
    ignoreDestructuring: true,
    camelcase: 'off',
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
