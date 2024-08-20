const validationMessages: Record<
  string,
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
  password: {
    invalid_type: "Password Is Should Be String!!!",
    required: "Password Is Required!!!",
  },
  refreshToken: {
    invalid_type: "Refresh Token Should be String!!!",
    required: "Refresh Token Is Required!!!",
  },
};

export default validationMessages;
