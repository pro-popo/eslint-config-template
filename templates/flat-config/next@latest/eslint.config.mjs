import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import importPlugin from 'eslint-plugin-import';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';

const eslintConfig = defineConfig(
  ...nextVitals,
  ...nextTs,
  eslintPluginPrettierRecommended,
  {
    plugins: {
      import: importPlugin,
      react: reactPlugin,
    },
    rules: {
      'prettier/prettier': ['warn'],

      // 템플릿 리터럴 권장
      'prefer-template': 'error',
      'no-useless-concat': 'error',

      // 사용하지 않는 변수 경고
      '@typescript-eslint/no-unused-vars': 'warn',

      // any 허용
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-require-imports': 'off',

      // return, throw, continue, break 뒤 도달 불가능 코드 허용
      'no-unreachable': 'off',
      '@typescript-eslint/no-unreachable-code': 'off',

      // 빈 interface 허용 여부
      '@typescript-eslint/no-empty-object-type': [
        'error',
        {
          allowInterfaces: 'with-single-extends',
        },
      ],

      // 객체 속성 축약
      'object-shorthand': ['warn'],

      // import 관련 규칙 (Next.js 전용 pathGroups 버전)
      'import/order': [
        'error',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            ['parent', 'sibling'],
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            {
              pattern: '@/lib/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@/components/*',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: '@{images,icon}/*',
              group: 'internal',
              position: 'before',
            },
          ],
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
          'newlines-between': 'always',
        },
      ],
      'import/first': ['error'],

      // React: 자식 없는 태그는 셀프 클로징
      'react/self-closing-comp': 'error',
    },
  },
  globalIgnores([
    '.next/**',
    'node_modules/**',
    'dist/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
  ]),
);

export default eslintConfig;
