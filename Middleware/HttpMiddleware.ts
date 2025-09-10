import { ErrorRequestHandler } from 'express'
import {httpError} from '../Error/HTTPerrors'


export const httpMiddleware: ErrorRequestHandler = (error , req, res, next) => {
    if (error instanceof httpError){
        res.status(error.status).json({message: error.message})
    }
    else if (error instanceof Error){
        res.status(500).json({message: error.message})
    }
    res.status(200).json({message: "Erro ao realizar a requisição"})
}