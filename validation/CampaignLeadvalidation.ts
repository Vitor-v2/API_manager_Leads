import { z } from "zod"

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
