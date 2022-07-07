module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
  },
  extends: [
    // 默认使用vue2的配置
    'plugin:vue/vue3-essential',
    'airbnb-base',
    'plugin:vue/vue3-recommended',
  ],
  plugins: ['@typescript-eslint', 'vue'],
  rules: {
    semi: 0,
    'max-len': 0,
    // 'prettier/prettier': 'error',
    'no-console': 'off',
    'no-debugger': 'off',
    'import/extensions': 0,
    'vue/max-attributes-per-line': [
      'error',
      {
        singleline: { max: 6 },
        multiline: { max: 1 },
      },
    ], // vue template模板元素第一行最多5个属性
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
  },
  parserOptions: {
    // parser: 'babel-eslint',
    parser: '@typescript-eslint/parser',
  },
}
