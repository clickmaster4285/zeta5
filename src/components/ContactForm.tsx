import { useState, useTransition, type FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { submitContactForm, type ContactSubmissionInput } from "@/lib/contact";

export function ContactForm() {
  const [form, setForm] = useState<ContactSubmissionInput>({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.currentTarget;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (error) setError(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    startTransition(async () => {
      try {
        await submitContactForm(form);
        setSubmitted(true);
        setForm({ name: "", email: "", company: "", message: "" });
      } catch (err) {
        setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      }
    });
  };

  if (submitted) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 px-6 py-10 text-center">
        <h3 className="text-xl font-semibold text-foreground">Message received</h3>
        <p className="mx-auto mt-3 max-w-sm text-sm text-muted-foreground">
          Thanks for reaching out. The Zeta team will get back to you shortly.
        </p>
        <Button
          type="button"
          variant="outline"
          className="mt-6"
          onClick={() => setSubmitted(false)}
        >
          Send another message
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mx-auto max-w-xl text-left">
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Your name"
            required
            disabled={isPending}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@company.com"
            required
            disabled={isPending}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="company">Company</Label>
          <Input
            id="company"
            name="company"
            value={form.company}
            onChange={handleChange}
            placeholder="Organization (optional)"
            disabled={isPending}
          />
        </div>
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="message">Message</Label>
          <Textarea
            id="message"
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Tell us about your project or requirements"
            rows={5}
            required
            disabled={isPending}
          />
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-destructive" role="alert">
          {error}
        </p>
      )}

      <Button
        type="submit"
        disabled={isPending}
        className="mt-6 w-full rounded-none px-8 font-semibold tracking-wide sm:w-auto"
      >
        {isPending ? "Sending..." : "Talk to our team"}
      </Button>
    </form>
  );
}
