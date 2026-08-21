import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required").max(120),
  email: z.string().email("Valid email is required").max(254),
  company: z.string().max(120).optional(),
  message: z.string().min(1, "Message is required").max(2000),
});

export type ContactSubmissionInput = z.infer<typeof contactSchema>;

export async function submitContactForm(data: ContactSubmissionInput) {
  const parsed = contactSchema.parse(data);

  const { error } = await supabase.from("contact_submissions").insert({
    name: parsed.name,
    email: parsed.email,
    company: parsed.company || null,
    message: parsed.message,
  });

  if (error) {
    console.error("Contact submission failed:", error);
    throw new Error("Failed to submit contact form. Please try again.");
  }

  return { success: true };
}
