// Re-export types for convenience
export type {
  AppointmentEmailData,
  ContactEmailData,
} from "./email-templates";

export interface EmailResponse {
  success: boolean;
  message?: string;
  error?: string;
}
