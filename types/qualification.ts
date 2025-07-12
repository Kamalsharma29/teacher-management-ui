export type QualificationType = "private" | "group";

export interface Qualification {
  name: string;
  rate: number;
  type: QualificationType;
}

