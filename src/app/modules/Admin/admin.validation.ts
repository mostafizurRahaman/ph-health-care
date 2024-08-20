import { z } from "zod";

const updateAdminValidation = z.object({
  body: z.object({
    name: z
      .string({
        invalid_type_error: "Name Should Be String!",
        required_error: "Name Is Required",
      })
      .optional(),

    contactNumber: z
      .string({
        invalid_type_error: "ContactNumber Should be String",
        required_error: "Contact Number Is Required",
      })
      .optional(),
    profilePhoto: z
      .string({
        invalid_type_error: "ContactNumber Should Be String!!",
        required_error: "Profile Photo Is Required!!!",
      })
      .optional(),
  }),
});

export const adminValidations = {
  updateAdminValidation,
};
