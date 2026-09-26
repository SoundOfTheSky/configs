import { defineConfig } from 'oxlint'

export default defineConfig({
  plugins: ['promise', 'jsx-a11y', 'import', 'unicorn', 'typescript', 'oxc'],
  rules: {
    'eslint/no-unused-vars': [
      'error',
      {
        fix: {
          imports: 'safe-fix',
        },
      },
    ],
  },
  options: {
    typeAware: true,
    typeCheck: true,
  },
})
