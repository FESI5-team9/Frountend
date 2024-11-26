import { z } from "zod";

const baseSchema = z
  .object({
    name: z
      .string()
      .min(2, "이름을 입력해주세요")
      .max(4, "4자 이하로 작성해주세요")
      .regex(/^[가-힣]+$/, "한글로 입력해주세요"),

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

    price: z.preprocess(
      value => {
        const parsedValue = Number(value);
        if (Number.isNaN(parsedValue)) {
          return value;
        }
        return parsedValue;
      },
      z.number().min(0, "0이상의 숫자만 입력해주세요"),
    ),

    textarea: z.string().max(500, "500자 이하로 작성해주세요").optional(),

    profileImageUrl: z.string().nullable().optional(),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "비밀번호가 일치하지 않습니다",
    path: ["confirmPassword"],
  });

export type FormSchema = z.infer<typeof baseSchema>;
export default baseSchema;
