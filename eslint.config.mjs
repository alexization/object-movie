import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import globals from 'globals';

export default [
    // 1. 전역적으로 무시할 파일 설정
    {
        ignores: ['dist/']
    },

    // 2. 기본 ESLint 및 TypeScript 추천 규칙 적용
    js.configs.recommended,
    ...tseslint.configs.recommended,

    // 3. 프로젝트별 세부 규칙 및 환경 설정
    {
        languageOptions: {
            globals: {
                ...globals.node // env: { node: true }
            }
        },
        rules: {
            // 기존 rules 설정
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/triple-slash-reference': ['error', { path: 'always' }],
            'no-useless-escape': 'off'
        }
    }
];
