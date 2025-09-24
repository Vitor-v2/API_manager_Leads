import { prisma } from "../database/db"
import { Handler } from "express"
import { httpError } from "../Error/HTTPerrors"
import { Prisma } from "@prisma/client"
import { getGroupLeadSchema } from "../validation/GroupLeadvalidation"

export class controllerGroupLead {
    getGroupsLead: Handler  = (req, res, next) =>{
        const groupId = +req.params.groupId
                  const validation = getGroupLeadSchema.parse(req.body)
                  const {page = '1', pageSize = '2', sortBy = 'New', name, order = 'asc',status} = validation
                      
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
                      next(error)
                  }
    }
