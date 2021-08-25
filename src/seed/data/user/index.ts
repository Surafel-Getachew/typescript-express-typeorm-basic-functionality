// import _ from "lodash";

import {User} from "../../../models/user.model";
import { UserRoles } from "../../../enums/user.role";

export type type = 'user';
export const model = User;
const password = "234-admin"

const items = {
     // Admin
  adminA: {
    name: 'Fahmi Mohammed',
    email: 'fahmi@medhan.et',
    role: UserRoles.ADMIN,
    password: password,
    phone: '0993929107',
  },

  // Doctors
  doctorMedhanet: {
    name: 'Fitsum Teklehaimanot',
    email: 'fitsum@medhan.et',
    role: UserRoles.DOCTOR,
    password: password,
    phone: '091900033',
  },
  doctorMedhanet2: {
    name: 'Lemlem Tewoldeberhan',
    email: 'lemlem@medhan.et',
    role: UserRoles.DOCTOR,
    password: password,
    phone: '00447932632301',
  },

  // Pharmacist users
  pharmaAhadu: {
    name: 'Ahadu Pharmacy',
    email: 'orders@ahadu.com',
    role: UserRoles.PHARMACIST,
    password: password,
    phone: '01020202',
  },
  pharmaLem: {
    name: 'Lem Pharmacy',
    email: 'orders@lem-pharmacy.com',
    role: UserRoles.PHARMACIST,
    password: password,
    phone: '010303',
  },

  // Patients
  patientA: {
    name: 'John Smith',
    role: UserRoles.PATIENT,
    password: password,
    phone: '0910111213',
  },
}

export const documents = items;