module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    '@vue/airbnb',
    'plugin:vue/vue3-essential',
    'plugin:vue/base',
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    '@vue/prettier',
    'prettier/@typescript-eslint',
    '@vue/typescript/recommended',
    'plugin:import/typescript',
  ],
  rules: {
    'import/extensions': 0,
    // 'import/extensions': ['error', 'always', {
    //   js: 'never',
    //   vue: 'never',
    // }],
    semi: 0,
    'max-len': [
      'off',
      {
        code: 120,
      },
    ],
    // 'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 6 },
        multiline: { max: 1 },
      },
    ],
    'vue/singleline-html-element-content-newline': 'off',
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': ['error', 'PascalCase'],
    'vue/no-v-html': 'off',
    'import/no-cycle': 0,
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
    camelcase: 'off',
    'arrow-body-style': ['off', 'never'],
    'object-curly-newline': 0,
    'import/order': 'off',
    '@typescript-eslint/consistent-type-imports': [
      'error',
      {
        prefer: 'type-imports',
        disallowTypeAnnotations: false,
      },
    ],
    'import/prefer-default-export': 'off',
    'no-restricted-syntax': 'off',
    'consistent-return': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'global-require': 'off',
    'no-use-before-define': 'warn',
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': 'error',
    'import/no-dynamic-require': 'off',
  },
  // parserOptions: {
  //   parser: 'babel-eslint',
  // },
}
