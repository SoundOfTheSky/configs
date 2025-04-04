// @ts-check

import eslint from '@eslint/js';
import tsParser from '@typescript-eslint/parser';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';
import unusedImports from 'eslint-plugin-unused-imports';
import tseslint from 'typescript-eslint';

export default baseSeverityOnFixability(
  tseslint.config(
    eslint.configs.recommended,
    ...tseslint.configs.strictTypeChecked,
    ...tseslint.configs.stylisticTypeChecked,
    eslintPluginPrettierRecommended,
    eslintPluginUnicorn.configs['flat/recommended'],
    jsxA11y.flatConfigs.strict,
    eslintPluginImportX.flatConfigs.recommended,
    eslintPluginImportX.flatConfigs.typescript,
    {
      files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
      ignores: ['eslint.config.mjs'],
      languageOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        parser: tsParser,
        parserOptions: {
          projectService: true,
          tsconfigRootDir: import.meta.dirname,
        },
      },
      plugins: {
        'unused-imports': unusedImports,
      },
      rules: {
        'prefer-math-min-max': 0, // Tenary is faster
        '@typescript-eslint/no-dynamic-delete': 0, // Don't cripple devs
        '@typescript-eslint/prefer-string-starts-ends-with': 0, // Sometimes is overhead
        '@typescript-eslint/consistent-type-definitions': [2, 'type'], // Types are easier to manage
        '@typescript-eslint/explicit-member-accessibility': 1, // provide access modifiers
        '@typescript-eslint/no-misused-promises': 0, // Some callbacks ignore return type
        '@typescript-eslint/no-non-null-assertion': 0, // TS isn't smart enough to enable this
        '@typescript-eslint/prefer-for-of': 0, // Standart for loop is faster
        '@typescript-eslint/restrict-template-expressions': [
          1,
          {
            allowNumber: true,
          },
        ], // number is easily converted to string
        '@typescript-eslint/restrict-plus-operands': [
          1,
          {
            allowNumberAndString: true,
          },
        ], // number is easily converted to string
        '@typescript-eslint/no-unused-vars': [
          1,
          {
            args: 'all',
            argsIgnorePattern: '^_',
            caughtErrors: 'all',
            caughtErrorsIgnorePattern: '^_',
            destructuredArrayIgnorePattern: '^_',
            varsIgnorePattern: '^_',
            ignoreRestSiblings: true,
          },
        ],
        '@typescript-eslint/no-unnecessary-condition': [
          2,
          {
            allowConstantLoopConditions: true,
          },
        ], // while(true) {...break...} is a part of normal coding
        '@typescript-eslint/no-explicit-any': 0, // Good dev will use these sparingly.

        'unused-imports/no-unused-imports': 1,
        'unused-imports/no-unused-vars': [
          1,
          {
            vars: 'all',
            varsIgnorePattern: '^_',
            args: 'after-used',
            argsIgnorePattern: '^_',
          },
        ],

        'jsx-a11y/media-has-caption': 0, // Sometimes sound is just a sound but I belive that this is useful

        'import-x/order': [
          1,
          {
            groups: [
              'builtin',
              'external',
              'internal',
              'parent',
              'sibling',
              'index',
              'object',
              'type',
              'unknown',
            ],
            pathGroups: [
              {
                pattern: '@/**',
                group: 'external',
                position: 'after',
              },
              {
                pattern: './**.scss',
                group: 'object',
                position: 'after',
              },
            ],
            'newlines-between': 'always',
            alphabetize: {
              order: 'asc',
            },
          },
        ],
        'import-x/newline-after-import': 1,
        'import-x/first': 1,

        'unicorn/prefer-math-trunc': 0, // | 0 Is faster than Math.trunk (in Firefox and Safari)
        'unicorn/consistent-function-scoping': 0, // Don't get in my way
        'unicorn/expiring-todo-comments': 0, // Keep it simple
        'unicorn/no-array-callback-reference': 0, // Need it sometimes
        'unicorn/no-array-method-this-argument': 0, // Need it sometimes
        'unicorn/no-for-loop': 0, // Standart for loop is faster
        'unicorn/no-nested-ternary': 0, // Sorry, I just want them
        'unicorn/no-new-array': 0, // Just disagree
        'unicorn/no-null': 0, // Sometimes needed
        'unicorn/no-useless-undefined': 0, // This rule has a hard time determining if it's useful or not
        'unicorn/prefer-code-point': 0, // Overhead, but yeah it's useful
        'unicorn/prefer-math-min-max': 0, // It's slower
        'unicorn/prefer-modern-math-apis': 0, // Bruh, "modern" math apis are slow af
      },
    },
  ),
)

function baseSeverityOnFixability(configs) {
  const plugins = {}
  for (const config of configs)
    for (const name in config.plugins) plugins[name] = config.plugins[name]
  for (const config of configs) {
    if (!config.rules) continue
    for (const ruleName in config.rules) {
      const slashIndex = ruleName.indexOf('/')
      const pluginName =
        slashIndex === -1 ? 'eslint' : ruleName.slice(0, slashIndex)
      const pluginRuleName =
        slashIndex === -1 ? ruleName : ruleName.slice(slashIndex + 1)
      const severity = plugins[pluginName]?.rules?.[pluginRuleName]?.meta
        ?.fixable
        ? 1
        : 2
      const rule = config.rules[ruleName]
      if (Array.isArray(rule) && rule[0] !== 'off' && rule[0] !== 0)
        rule[0] = severity
      else if (rule !== 'off' && rule !== 0)
        config.rules = { ...config.rules, [ruleName]: severity }
    }
  }
  return configs
}
