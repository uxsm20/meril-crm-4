import * as z from "zod";
import { DealStage } from "../../types/deal";

export const dealFormSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  value: z.number().min(0, "Value must be positive"),
  stage: z.enum(["Lead", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"] as const),
  probability: z.number().min(0).max(100, "Probability must be between 0 and 100"),
  expectedCloseDate: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return parsedDate > new Date();
  }, "Expected close date must be in the future"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

export type DealFormData = z.infer<typeof dealFormSchema>;

export const activityFormSchema = z.object({
  type: z.enum(["Call", "Meeting", "Email", "Task", "Note"] as const),
  title: z.string().min(3, "Title must be at least 3 characters"),
  date: z.string().refine((date) => {
    const parsedDate = new Date(date);
    return !isNaN(parsedDate.getTime());
  }, "Invalid date"),
  notes: z.string().min(10, "Notes must be at least 10 characters"),
});

export type ActivityFormData = z.infer<typeof activityFormSchema>;

export const proposalFormSchema = z.object({
  version: z.string().min(1, "Version is required"),
  status: z.enum(["Draft", "Sent", "Accepted", "Rejected"] as const),
  content: z.string().min(10, "Content must be at least 10 characters"),
});

export type ProposalFormData = z.infer<typeof proposalFormSchema>;
