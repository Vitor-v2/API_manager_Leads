import z from "zod";

export const createGroupSchema = z.object({
  name: z.string(),
  description: z.string() 
})

const schemaStatus = z.enum([
    "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Archived",
  ])
  
export const getGroupLeadSchema = z.object({
  name: z.string().optional(),
  page: z.string().optional(),
  pageSize: z.string().optional(),
  status: schemaStatus.optional(),
  sortBy: z.enum(['name', 'status', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional()
})
