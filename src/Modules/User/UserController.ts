import { Request, response, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IUserController, IUserService } from "./structure"


export default class UserController implements IUserController{

        constructor (private userService:IUserService){}

        async create(req:Request, res:Response ):Promise<void>{
            
            const {name,CPF,email}=req.body

            const user = await this.userService.create({
                name,
                CPF,
                email
            })

            if(user instanceof Error){
                res.json(user.message)
            }

            res.json(user)

        }
       
        //Método find para buscar todos usuarios
        async find(req:Request, res:Response):Promise<void>{
            const users = await this.userService.find()
            res.json(users)
        }

        //Método find para buscar especifica
        async findById(req: Request, res: Response): Promise<void> {
            const {id} = req.params
            const user = await this.userService.findById(id)
            res.json(user)
        }

        //Método deleted User
        async delete(req: Request, res: Response): Promise<void> {
            const {id} = req.params
            const result = await this.userService.delete(id)
            res.status(200).json(result)
                                  
        }

        //Método Update atualiza
        async update(req: Request, res: Response): Promise<void> {
            
            const {id} = req.params
            const {name, CPF, email} = req.body

            const user = await this.userService.update(id,name,CPF,email)

            res.json(user)

        }
}