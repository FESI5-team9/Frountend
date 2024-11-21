module.exports = {
  singleQuote: false, // 쌍따옴표 사용
  semi: true, // 세미콜론 사용
  tabWidth: 2, // 탭 너비 2칸
  trailingComma: "all", // 여러 줄일 때 마지막 요소에 쉼표
  printWidth: 100,
  arrowParens: "avoid", // 화살표 함수의 매개변수에 괄호를 사용하지 않음
  endOfLine: "auto", // 파일 끝 줄바꿈 문자를 이미 존재하는 문자로 유지
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};
