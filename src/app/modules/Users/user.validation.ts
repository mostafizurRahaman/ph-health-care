import { z } from "zod";
import validationMessages from "../../configs/validationMesage";

const createAdminValidationSchema = z.object({
  body: z.object({
    password: z.string({
      required_error: validationMessages.password.required,
      invalid_type_error: validationMessages.password.required,
    }),
    admin: z.object({
      name: z.string({
        required_error: validationMessages.name.required,
        invalid_type_error: validationMessages.name.invalid_type,
      }),
      email: z.string({
        required_error: validationMessages.email.required,
        invalid_type_error: validationMessages.email.invalid_type,
      }),
      contactNumber: z.string({
        required_error: validationMessages.contactNumber.required,
        invalid_type_error: validationMessages.contactNumber.invalid_type,
      }),
    }),
  }),
});

export const userValidationSchema = {
  createAdminValidationSchema,
};
