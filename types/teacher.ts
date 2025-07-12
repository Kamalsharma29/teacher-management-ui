import { Qualification } from "./qualification";

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  avatarUrl: string;
  joinedOn: string;
  phone: string;
  from: string;
  experience: number;
  schedule: {
    [day: string]: string;
  };
  qualifications: Qualification[];
}
export type { Qualification } from "./qualification";




