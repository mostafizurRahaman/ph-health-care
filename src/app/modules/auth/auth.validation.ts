import { z } from "zod";
import validationMessages from "../../configs/validationMesage";

const loginValidation = z.object({
  body: z.object({
    email: z.string({
      required_error: validationMessages.email.required,
      invalid_type_error: validationMessages.email.invalid_type,
    }),
    password: z.string({
      required_error: validationMessages.password.required,
      invalid_type_error: validationMessages.password.invalid_type,
    }),
  }),
});

const refreshToken = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: validationMessages.refreshToken.required,
      invalid_type_error: validationMessages.refreshToken.invalid_type,
    }),
  }),
});

export const authValidations = {
  loginValidation,
  refreshToken,
};
