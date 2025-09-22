import { prisma } from "../database/db"
import { Handler } from "express"
import { httpError } from "../Error/HTTPerrors"
import { schemaAddCampaignLead, schemaFindManyCampaignLead } from "../validation/CampaignLeadvalidation"
import { Prisma } from "@prisma/client"

export class controllerCampaignLeads {

        getLeads: Handler = async (req, res, next) =>{
            try {
            const campaignId = +req.params.campaignId
            const validation = schemaFindManyCampaignLead.parse(req.body)
            const {page = '1', pageSize = '2', sortBy = 'New', name, order = 'asc',status} = validation
            
                const where: Prisma.LeadWhereInput = {
                    Campaign:{
                        some:{campaignId}
                    }
                }
                if(!name) throw new httpError(404, "nome não encontrado")
                where.name = name
                if(!status) throw new httpError(404, "nome não encontrado")
                where.status = status

                const result = await prisma.lead.findMany({
                    where,
                    skip: (+page - 1 ) * +pageSize,
                    take: +pageSize,
                    orderBy:{[sortBy]: order},
                    include:{
                        Campaign: {
                            select:{
                                campaignId: true,
                                leadId: true,
                                status: true
                            }
                        }
                    }
                })

                const count = await prisma.lead.count({where})

                res.json({data: result,
                    meta:{
                        page: page,
                        pageSize: pageSize,
                        total: count,
                        totalPages: Math.ceil(count/+pageSize)
                    }
                })
            } catch (error) {
                next(error)
            }
        }
    
        addLeads: Handler = async (req, res, next)=>{
            try{
                console.log(req.params)
                const query = schemaAddCampaignLead.parse(req.body)
                const result = await prisma.campaignLead.create({
                    data:{
                        campaignId: +req.params.campaignId,
                        leadId: query.leadId,
                        status: query.status
                    },
                    

                })
                if(!result) throw new httpError(400, "Can not find")
                    res.status(200).json(result)
            } catch(error){
                next(error)
            }
        }
        
        updateStatus: Handler = async (req, res, next)=>{
            console.log(req.params)
            try{
                const query = schemaAddCampaignLead.parse(req.body)
                const result = await prisma.campaignLead.update({
                    data: query,
                    where:{
                            leadId_campaignId:{
                                campaignId: +req.params.campaignId,
                                leadId: +req.params.leadId
                            }
                    }
                })
                if(!result) throw new httpError(400, "Can not find")
                    res.status(200).json(result)
            } catch(error){
                next(error)
            }        
        }

        deleteLead: Handler = async (req, res, next)=>{
            try {
                const result = await prisma.campaignLead.delete({
                    where: {
                        leadId_campaignId: {
                            campaignId: +req.params.campaignid,
                            leadId:  +req.params.idLead
                        }
                    }
                })
                if(!result) throw new httpError(404, "Não foi possível deletar")
                res.status(200).json(result)
            } catch (error) {
                next(error)
            }        
        }
}
