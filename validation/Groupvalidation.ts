import { z } from "zod"

export const updateGroupSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional() 
})

export const createGroupSchema = z.object({
  name: z.string(),
  description: z.string() 
})
