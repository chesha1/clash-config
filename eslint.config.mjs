import globals from 'globals';
import pluginJs from '@eslint/js';
import stylistic from '@stylistic/eslint-plugin';
import perfectionist from 'eslint-plugin-perfectionist';

/** @type {import('eslint').Linter.Config[]} */
export default [
  {
    plugins: {
      perfectionist,
    },
    rules: {
      'perfectionist/sort-sets': [
        'error',
        {
          type: 'alphabetical',
          order: 'asc',
          fallbackSort: { type: 'unsorted' },
          ignoreCase: true,
          specialCharacters: 'keep',
          groupKind: 'literals-first',
          partitionByNewLine: false,
          newlinesBetween: 'ignore',
          useConfigurationIf: {},
          groups: [],
          customGroups: [],
        },
      ],
    },
  },
  {
    languageOptions: {
      globals: globals.browser,
    },
  },
  pluginJs.configs.recommended,
  {
    plugins: {
      '@stylistic': stylistic,
    },
    rules: {
      ...stylistic.configs.customize({
        semi: true,
      }).rules,
    },
  },
  {
    rules: {
      'no-undef': 'off',
      'no-useless-escape': 'off',
      'no-unused-vars': 'off',
    },
  },
];
