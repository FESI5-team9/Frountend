import { z } from "zod";

const baseSchema = z.object({
  nickname: z
    .string()
    .min(2, "닉네임을 입력해주세요")
    .max(10, "10자 이하로 작성해주세요")
    .regex(/^[^!@#$%^&*(),.?":{}|<>]*$/, "이름에 특수문자가 포함될 수 없습니다"),

  email: z.string().min(1, "이메일을 입력해주세요").email("이메일 형식으로 작성해 주세요"),

  password: z
    .string()
    .min(8, "8자 이상 입력해주세요")
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "비밀번호는 8자 이상, 영문, 숫자, 특수문자(@$!%*#?&)를 모두 포함해야 합니다",
    ),

  confirmPassword: z.string().min(1, "비밀번호를 입력해주세요").min(8, "8자 이상 입력해주세요"),
});

export type FormSchema = z.infer<typeof baseSchema>;
export default baseSchema;
