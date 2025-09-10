import { Handler } from "express";
import { prisma } from "../database/db";
import { schemaCreateLead, schemaFindMany, schemaUpdateLead } from "../validation/validation";
import { httpError } from "../Error/HTTPerrors";
import { Prisma } from "@prisma/client";

export class controllerLead {
    index: Handler = async (req, res, next) =>{
        try {
            const query = schemaFindMany.parse(req.query)
            const {page = "1", pageSize = "5",name, status, sortBy = 'name', order = 'desc'} = query

            const where: Prisma.LeadWhereInput = {}
            
            if (name) where.name = {contains: name, mode: "insensitive"}
            if(status) where.status = {equals: status}

            const result = await prisma.lead.findMany({
                where,
                skip: (+page - 1) * +pageSize,
                take: +pageSize,
                orderBy:{
                    [sortBy]: order
                }
            })

            const countLead = await prisma.lead.count({
                where,
                skip: (+page - 1) * +pageSize,
                take: +pageSize,
                orderBy:{
                    [sortBy]: order
                }
            })
            // if(!page && !pageSize) {
            //     const result = await prisma.lead.findMany()
            //     res.status(200).json(result)
            // } else{
            //     const page = query.page || 1
            //     const pageSize = query.pageSize || 5
            //     const total = (page - 1) * pageSize
            //     const result = await prisma.lead.findMany(
            //     {
            //         orderBy:{
            //         id: "asc"
            //     },
            //     where:{
            //         status: query.status,
                    
            //     },
            //     skip: total,
            //     take: pageSize
        //     }
        // )
            res.status(200).json({result, countLead})
        } catch (error) {
            next(error)
        }
    }

    create: Handler = async (req, res, next) =>{
        try{
            const creatBody = schemaCreateLead.parse(req.body)
            const result = await prisma.lead.create({
                data: creatBody
            }
            )
            res.status(200).json(result)
        }catch (error){
            next(error)
        }
    }

    findById: Handler = async (req,res,next)=>{
        try {
            const result = await prisma.lead.findUnique({
                where: {
                    id: +req.params.id
                },
                include:{
                    Campaign: true,
                    groups: true
                }
            })
            if(!result) throw new httpError(404, "Id não encontrado")

            res.status(200).json(result)
        } catch (error) {
            next(error)
        }
    }
    update: Handler = async(req,res,next)=>{
        try {
            const requestValid = schemaUpdateLead.parse(req.body)
            
            const findLead = await prisma.lead.findUnique({
                where:{
                    id: +req.params.id
                }
            })
            if(!findLead) throw new httpError(404, "Não foi encontrado para a atualização")
            const result = await prisma.lead.update({
                where: {
                    id: +req.params.id
                },
                data:requestValid
            })
            res.json(result)
        } catch (error) {
            next(error)
        }
            
    }


    delete: Handler = async(req, res, next)=>{
        try {
            const result = await prisma.lead.delete({
                where:{
                    id: +req.params.id
                }
            })
            if(!result) throw new httpError(400, "Id não encontrado")
            res.json(result)
        } catch (error) {
            next(error)
        }
    }
}

