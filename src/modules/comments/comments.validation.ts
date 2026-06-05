import z from "zod";

export const commentsValidation = {
  body: z.object({
    text: z.string(),
    mention: z.string().optional(),
    Emoji: z.string().optional(),
  }),
};
