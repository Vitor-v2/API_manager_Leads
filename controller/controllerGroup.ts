import { Handler } from "express"
import {prisma} from '../database/db'
import { httpError } from "../Error/HTTPerrors"
import { createGroupSchema, updateGroupSchema } from "../validation/Groupvalidation"

export class controllerGroup {
    
    index: Handler = async (req, res, next) =>{
        try {
            const result = await prisma.group.findMany()
            res.json(result)
        } catch (error) {
            next(error)
        }
    }

    show: Handler = async (req, res, next)=>{
        try{

            const {id} = req.params
            const result = await prisma.group.findUnique({
                where: {id: +id}
            })
            if(!result) throw new httpError(400, "Can not find")
                res.status(200).json(result)
        } catch(error){
            next(error)
        }
    }
    create: Handler = async (req, res, next)=>{
        try{
            const dataValidated = createGroupSchema.parse(req.body)
            const result = await prisma.group.create({
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
            const dataValidated = updateGroupSchema.parse(req.body)
            const update = await prisma.group.update({
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
            const result = await prisma.group.delete({
                where: {id: +id}
            })
            if(!result) throw new httpError(404, "Não foi possível deletar")
            res.status(200).json(result)
        } catch (error) {
            next(error)
        }        
    }

}