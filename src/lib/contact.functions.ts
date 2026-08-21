import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Valid email is required").max(254),
  company: z.string().max(120).optional(),
  message: z.string().min(1, "Message is required").max(2000),
});

export type ContactSubmissionInput = z.infer<typeof contactSchema>;

export const submitContactForm = createServerFn({ method: "POST" })
  .inputValidator((data) => contactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");

    const { error } = await supabaseAdmin.from("contact_submissions").insert({
      name: data.name,
      email: data.email,
      company: data.company || null,
      message: data.message,
    });

    if (error) {
      console.error("Contact submission failed:", error);
      throw new Error("Failed to submit contact form. Please try again.");
    }

    return { success: true };
  });
