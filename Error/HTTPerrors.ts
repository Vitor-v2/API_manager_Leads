export class httpError extends Error {
    status: number
    constructor (status: number,erro: string){
        super(erro)
        this.status = status
    }   
}
