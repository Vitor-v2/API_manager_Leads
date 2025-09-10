import { prisma } from "../database/db"
import { Handler } from "express"
import { httpError } from "../Error/HTTPerrors"
import { createCampaignSchema, updateCampaignSchema } from "../validation/validation"

export class controllerCampaign {

        index: Handler = async (req, res, next) =>{
            try {
                const result = await prisma.campaign.findMany()
                res.json(result)
            } catch (error) {
                next(error)
            }
        }
    
        show: Handler = async (req, res, next)=>{
            try{
    
                const {id} = req.params
                const result = await prisma.campaign.findUnique({
                    where: {id: +id},
                    include:{Lead: true}
                })
                if(!result) throw new httpError(400, "Can not find")
                    res.status(200).json(result)
            } catch(error){
                next(error)
            }
        }
        create: Handler = async (req, res, next)=>{
            try{
                const dataValidated = createCampaignSchema.parse(req.body)
                const result = await prisma.campaign.create({
                    data: dataValidated
                })
                res.status(200).json(result)
            } catch (error){
                next(error)
            }
        }
        update: Handler = async (req, res, next)=>{
            try {
                const {id} = req.params
                const dataValidated = updateCampaignSchema.parse(req.body)
                const update = await prisma.campaign.update({
                    data: dataValidated,
                    where: {id: +id}
                })
                if(!update) throw new httpError(404, "Não foi possível atualizar")
                res.status(200).json(update)
            } catch (error) {
                next(error)
            }        
        }
        delete: Handler = async (req, res, next)=>{
            try {
                const {id} = req.params
                const result = await prisma.campaign.delete({
                    where: {id: +id}
                })
                if(!result) throw new httpError(404, "Não foi possível deletar")
                res.status(200).json(result)
            } catch (error) {
                next(error)
            }        
        }
}
