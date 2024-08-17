//  UserRoles
export const UserRole = {
  SUPER_ADMIN: "SUPER_ADMIN",
  ADMIN: "ADMIN",
  DOCTOR: "DOCTOR",
  PATIENT: "PATIENT",
} as const;

//  UserStatus **

export const UserStatus = {
  ACTIVE: "ACTIVE",
  BLOCKED: "BLOCKED",
} as const;

export type IUserRole = keyof typeof UserRole;

export type IUserStatus = keyof typeof UserStatus;
