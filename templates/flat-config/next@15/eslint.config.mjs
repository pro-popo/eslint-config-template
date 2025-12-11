import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";
import eslintConfigPrettier from "eslint-config-prettier";
import eslintPluginPrettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  resolvePluginsRelativeTo: __dirname
});


const eslintConfig = [
  ...compat.extends(
    "plugin:import/recommended",
    "plugin:import/typescript",
    "next/core-web-vitals",
    "next/typescript"
  ),
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      "prettier/prettier": ["warn"],

      // 템플릿 리터럴 권장
      "prefer-template": "error",
      "no-useless-concat": "error",

      // 사용하지 않는 변수 경고
      "@typescript-eslint/no-unused-vars": "warn",

      // any 허용
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-require-imports": "off",

      // return, throw, continue, break 뒤 도달 불가능 코드 허용
      "no-unreachable": "off",
      "@typescript-eslint/no-unreachable-code": "off",

      // 빈 interface 허용 여부
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "with-single-extends"
        }
      ],

      // 객체 속성 축약
      "object-shorthand": ["warn"],

      // import 관련 규칙 (Next.js 전용 pathGroups 버전)
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
            "type"
          ],
          pathGroups: [
            {
              pattern: "@/lib/*",
              group: "internal",
              position: "after"
            },
            {
              pattern: "@/components/*",
              group: "internal",
              position: "after"
            },
            {
              pattern: "@{images,icon}/*",
              group: "internal",
              position: "before"
            }
          ],
          alphabetize: {
            order: "asc",
            caseInsensitive: true
          },
          "newlines-between": "always"
        }
      ],
      "import/first": ["error"],
      
      // React: 자식 없는 태그는 셀프 클로징
      "react/self-closing-comp": "error",

      // React 17+ JSX 자동 import
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off"
    },
    ignores: [".next", "node_modules", "dist", "build", "out"]
  },

  // prettier 최종 정리
  eslintConfigPrettier
];

export default eslintConfig;