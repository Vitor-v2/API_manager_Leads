import { prisma } from "../database/db"
import { Handler } from "express"
import { httpError } from "../Error/HTTPerrors"
import { Prisma } from "@prisma/client"
import { deleteGroupLeadSchema, getGroupLeadSchema, updateGroupLeadSchema } from "../validation/GroupLeadvalidation"


export class controllerLeadinGroup {
    getLeadinGroup: Handler  = async (req, res, next) =>{
        try {
            const groupId = +req.params.groupId
            const validData = getGroupLeadSchema.parse(req.body)
            const {page = '1', pageSize = '2', sortBy = 'New', name, order = 'asc',status} = validData
                      
                  const where: Prisma.LeadWhereInput ={
                   groups:{
                    some:{id: groupId}
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
                              groups: {
                                  select:{
                                      name: true,
                                      description: true,
                                      leads: true
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
            console.log(error)
        }
    }

    addLeadinGroup: Handler = async (req, res, next) =>{
        try {
            
            const groupId = +req.params.groupId
            const validation = updateGroupLeadSchema.parse(req.body)
            
            if(!validation) throw new httpError(400, "Preencha o id")
            
            const result = await prisma.group.update({
                where:{
                    id: groupId
                },
                data:{
                    leads:{
                        connect:{
                            id: validation.id
                        }
                    }
                },
                include:{leads: true}
            })
            
            res.json(result)
        } catch (error) {
            next(error)
        }
        }

    deleteLeadinGroup: Handler = async (req,res,next) => {
        try {
            const param = +req.params.id
            const query = deleteGroupLeadSchema.parse(req.body)

            
            const result = await prisma.group.update({
                where:{
                    id: param
                },
                data:{
                    leads:{
                        disconnect:{ id: query.id}
                }
            },
            include:{ leads: true}
        })
            res.json(result)
        } catch (error) {
     next(error)   
    }    
    }
}
