import { z } from "zod";

const updateSettingsValidationSchema = z.object({
  body: z.object({
    teamEmails: z.record(z.string().email("Invalid email format")),
  }),
});

export const settingsValidation = {
  updateSettingsValidationSchema,
};