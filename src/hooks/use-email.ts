"use client";

import { useState } from "react";
import type {
  AppointmentEmailData,
  ContactEmailData,
  EmailResponse,
} from "@/lib/email";

interface UseEmailReturn {
  sendAppointment: (
    data: AppointmentEmailData
  ) => Promise<EmailResponse>;
  sendContact: (
    data: ContactEmailData
  ) => Promise<EmailResponse>;
  isLoading: boolean;
  error: string | null;
}

/**
 * Custom hook for sending emails via API
 * Provides loading state and error handling
 */
export function useEmail(): UseEmailReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const sendAppointment = async (
    data: AppointmentEmailData
  ): Promise<EmailResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/email/appointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || "Failed to send email");
        return result;
      }

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  const sendContact = async (
    data: ContactEmailData
  ): Promise<EmailResponse> => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/email/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        setError(result.error || "Failed to send email");
        return result;
      }

      return result;
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "An unexpected error occurred";
      setError(errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    sendAppointment,
    sendContact,
    isLoading,
    error,
  };
}

