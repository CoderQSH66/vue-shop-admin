/* eslint-disable import/no-extraneous-dependencies */
/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'airbnb-base',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    // 解决导入文件无法识别@的问题
    'import/resolver': {
      typescript: {
        project: './tsconfig.*.json'
      }
    }
  },
  rules: {
    'vue/comment-directive': 'off',
    // 允许直接导出
    'import/prefer-default-export': 'off',
    // 禁用组件命名检测规则
    'vue/multi-word-component-names': 'off',
    // 禁用依赖检测规则
    'import/no-extraneous-dependencies': 'off',
    'no-param-reassign': 'off',
    'no-nested-ternary': 'off',
    // 对导入文件后缀的检测规则
    'import/extensions': ['error', 'ignorePackages', { js: 'never', jsx: 'never', ts: 'never', tsx: 'never' }],
    // 导入模块的顺序规则
    'import/order': [
      'error',
      {
        groups: [
          /* 
            builtin ：内置模块，如 path，fs等 Node.js内置模块。
            external ：外部模块，如 lodash ，react 等第三方库。
            internal ：内部模块，如相对路径的模块、包名前缀为 @ 的模块。
            unknown ：未知模块，如模块名没有指定扩展名或模块路径缺失扩展名。
            parent ：父级目录的模块。
            sibling ：同级目录的模块。
            index ：当前目录的 index 文件。
            object ：使用ES6 导入的模块。
            type ：使用 import type 导入的模块。
          */
          ['builtin', 'external'],
          'internal',
          ['parent', 'sibling'],
          'index',
          'type',
          'object',
          'unknown'
        ],
        pathGroups: [
          {
            pattern: '../**',
            group: 'parent',
            position: 'after'
          },
          {
            pattern: './*.scss',
            group: 'sibling',
            position: 'after'
          }
        ],
        // 不同组之间是否换行。
        'newlines-between': 'always',
        // 根据字母顺序对每组内的引用进行排序。
        alphabetize: {
          order: 'asc',
          caseInsensitive: true
        }
      }
    ]
  }
}
