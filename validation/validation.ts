import {z} from "zod"

const schemaStatus = z.enum([
    "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Archived",
  ])

export const schemaCreateLead = z.object({
  name: z.string(),
  email: z.string(),
  phone: z.number(),
  status: schemaStatus.optional()
})

export const schemaUpdateLead = z.object({
  name: z.string().optional(),
  email: z.string().optional(),
  phone: z.number().optional(),
  status: schemaStatus.optional()
})

export const schemaFindMany = z.object({
  name: z.string().optional(),
  page: z.string().optional(),
  pageSize: z.string().optional(),
  status: schemaStatus.optional(),
  sortBy: z.enum(['name', 'status', 'createdAt']).optional(),
  order: z.enum(['asc', 'desc']).optional()
})

//GROUP

export const updateGroupSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional() 
})

export const createGroupSchema = z.object({
  name: z.string(),
  description: z.string() 
})

// CAMPAIGN
export const updateCampaignSchema = z.object({
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date().optional(),
  endDate: z.coerce.date().optional()
})

export const createCampaignSchema = z.object({ 
  name: z.string(),
  description: z.string(),
  startDate: z.coerce.date().default(()=> new Date()),
  endDate: z.coerce.date().optional()
})

const statusCampaignLead = z.enum(
  [
  "New",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Archived"
  ]
)

// CAMPAIGN LEAD
export const schemaFindManyCampaignLead = z.object({
  name: z.string().optional(),
  page: z.string().optional(),
  pageSize: z.string().optional(),
  status: statusCampaignLead.optional(),
  sortBy: z.enum(["New",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Archived"]).optional(),
  order: z.enum(['asc', 'desc']).optional()
})


export const schemaAddCampaignLead = z.object({
  leadId: z.number(),
  status: z.enum([
"New",
  "Engaged",
  "FollowUp_Scheduled",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Re_Engaged",
  "Opted_Out",
  "TEST"
  ])
})

export const schemaUpdateCampaignLead = z.object({
  status: z.enum([
"New",
  "Engaged",
  "FollowUp_Scheduled",
  "Contacted",
  "Qualified",
  "Converted",
  "Unresponsive",
  "Disqualified",
  "Re_Engaged",
  "Opted_Out",
  ])
})

