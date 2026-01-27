import { z, defineCollection } from "astro:content";

const topicsSchema = z.preprocess((val) => {
  if (Array.isArray(val)) return val.filter((item) => typeof item === "string");
  if (typeof val === "string") return [val];
  return [];
}, z.array(z.string()).default([]));

const notes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    structural: z.string().optional().default("ЗАМЕТКИ"),
    topics: topicsSchema,
    draft: z.boolean().optional()
  })
});

const schemes = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    date: z.coerce.date().optional(),
    topics: topicsSchema,
    image: z.string().optional().default("")
  })
});

export const collections = { notes, schemes };
