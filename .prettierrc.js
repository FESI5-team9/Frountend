module.exports = {
  printWidth: 100,
  arrowParens: "avoid", // 화살표 함수의 매개변수에 괄호를 사용하지 않음
  endOfLine: "auto", // 파일 끝 줄바꿈 문자를 이미 존재하는 문자로 유지
  importOrder: [
    "<THIRD_PARTY_MODULES>",
    "^@/apis/(.*)$",
    "^@/hooks/(.*)$",
    "^@/components/(.*)$",
    "^(?:@/utils/|@/lib/|@/store/|@/contexts/)(.*)$",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifiers: true,
  plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],
};
