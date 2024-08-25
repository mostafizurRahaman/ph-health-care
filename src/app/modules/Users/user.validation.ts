import { Gender, UserStatus } from "@prisma/client";
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




const createDoctor = z.object({
  body: z.object({
    password: z.string({
      required_error: validationMessages.password.required,
      invalid_type_error: validationMessages.password.invalid_type,
    }),
    doctor: z.object({
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
      address: z
        .string({
          required_error: validationMessages.address.required,
          invalid_type_error: validationMessages.address.invalid_type,
        })
        .optional(),
      registrationNumber: z.string({
        required_error: validationMessages.registrationNumber.required,
        invalid_type_error: validationMessages.registrationNumber.invalid_type,
      }),
      experience: z
        .number({
          invalid_type_error: validationMessages.experience.invalid_type,
        })
        .default(0)
        .optional(),
      gender: z.enum([Gender.MALE, Gender.FEMALE, Gender.OTHERS], {
        message: `Gender SHOULD BE  ${Gender.MALE} OR ${Gender.FEMALE}  OR ${Gender.OTHERS}`,
      }),
      appointmentFee: z.number({
        required_error: validationMessages.appointmentFee.required,
        invalid_type_error: validationMessages.appointmentFee.invalid_type,
      }),
      qualification: z.string({
        required_error: validationMessages.qualification.required,
        invalid_type_error: validationMessages.qualification.required,
      }),
      currentWorkingPlace: z.string({
        required_error: validationMessages.currentWorkingPlace.required,
        invalid_type_error: validationMessages.currentWorkingPlace.invalid_type,
      }),
      designation: z.string({
        required_error: validationMessages.designation.required,
        invalid_type_error: validationMessages.designation.invalid_type,
      }),
    }),
  }),
});



const createPatient = z.object({
  body: z.object({
    password: z.string({
      required_error: validationMessages.password.required,
      invalid_type_error: validationMessages.password.invalid_type,
    }),
    patient: z.object({
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
      address: z
        .string({
          required_error: validationMessages.address.required,
          invalid_type_error: validationMessages.address.invalid_type,
        })
        .optional(),
    }),
  }),
});



const changeUserStatus = z.object({
    body: z.object({
       status: z.enum([UserStatus.ACTIVE, UserStatus.BLOCKED, UserStatus.DELETED], {
         message: "Role Should Be ACTIVE OR BLOCKED OR DELETED!!!"
       })
    })
})

export const userValidationSchema = {
  createAdminValidationSchema,
  createDoctor,
  createPatient,
  changeUserStatus,
};
