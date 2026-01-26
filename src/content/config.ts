import { z, defineCollection } from "astro:content";

const notes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    structural: z.string(),
    topics: z.preprocess(
      (val) => (typeof val === "string" ? [val] : val),
      z.array(z.string()).default([])
    ),
    draft: z.boolean().optional()
  })
});

const schemes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    topics: z.string(),
    image: z.string()
  })
});

export const collections = { notes, schemes };
