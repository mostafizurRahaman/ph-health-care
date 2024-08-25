type validationFieldsTypes =
  | "name"
  | "email"
  | "contactNumber"
  | "address"
  | "password"
  | "registrationNumber"
  | "refreshToken"
  | "appointmentFee"
  | "experience"
  | "qualification"
  | "currentWorkingPlace"
  | "designation"

const validationMessages: Record<
  validationFieldsTypes,
  { invalid_type: string; required: string }
> = {
  name: {
    invalid_type: "Name Should Be String!!!",
    required: "Name Is Required!!!",
  },
  email: {
    invalid_type: "Email Should Be String!!!",
    required: "Email Is Required!!!",
  },
  contactNumber: {
    invalid_type: "ContactNumber Should Be String!!!",
    required: "ContactNumber Is Required!!!",
  },
  address: {
    invalid_type: "Address Should Be String!!!",
    required: "Address Is Required!!!",
  },
  password: {
    invalid_type: "Password Is Should Be String!!!",
    required: "Password Is Required!!!",
  },
  registrationNumber: {
    invalid_type: "RegistrationNumber Is Should Be String!!!",
    required: "RegistrationNumber Is Required!!!",
  },
  refreshToken: {
    invalid_type: "Refresh Token Should be String!!!",
    required: "Refresh Token Is Required!!!",
  },
  appointmentFee: {
    invalid_type: "Appointment Should be Number!!!",
    required: "Appointment Is Required!!!",
  },
  experience: {
    invalid_type: "Experience Should be Number!!!",
    required: "Experience Is Required!!!",
  },
  qualification: {
    invalid_type: "Qualification Should be String!!!",
    required: "Qualification Is Required!!!",
  },
  currentWorkingPlace: {
    invalid_type: "Current Work Place Should be String!!!", 
    required: "Current work Place Should be String!!!"
  },
  designation: {
    invalid_type: "Designation Should be String!!!", 
    required: "Designation Should be String!!!"
  }

};

export default validationMessages;
