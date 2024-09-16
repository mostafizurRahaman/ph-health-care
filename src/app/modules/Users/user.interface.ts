import { Doctor, Gender, Patient } from "@prisma/client";
import { IUserRole, IUserStatus } from "./user.constraint";

export interface IUser {
  id?: string;
  email: string;
  password: string;
  role: IUserRole;
  needsPasswordChanged: boolean;
  status: IUserStatus;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IAdminData {
  password: string;
  admin: {
    name: string;
    email: string;
    profilePhoto?: string;
    contactNumber: string;
  };
}

export interface IPaitentData {
  password: string;
  patient: Patient;
}
export interface IDoctorData {
  password: string;
  doctor: Doctor;
}
export interface IAdmin {
  id?: string;
  email: string;
  name: string;
  profilePhoto: string;
  contactNumber: string;
  isDeleted: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IProfileUpdateInfo {
  name?: string;
  profilePhoto?: string;
  contactNumber?: string;
  gender?: Gender;
  registrationNumber?: string;
  experience?: number;
  appointmentFee?: number;
  qualification?: string;
  currentWorkingPlace?: string;
  designation?: string;
}
