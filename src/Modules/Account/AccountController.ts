import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IAccountController, IAccountService } from "./structure";


export default class AccountController implements IAccountController{

    constructor(private accountService:IAccountService){}

    async create(req: Request, res: Response): Promise<void> {
        const {typeAccount,balance,id_idUser} = req.body

        const account = await this.accountService.create({
            typeAccount,
            balance,
            id_idUser
        })

        res.status(201).json(account)
    }

    async find(req: Request, res: Response): Promise<void> {
        const accounts = await this.accountService.find()
        res.status(200).json(accounts)
    }

    async deposit(req: Request, res: Response): Promise<void> {
        
        const {id} = req.params
        const{depositValue} = req.body

        const account = await this.accountService.deposit(id,depositValue)

        res.json(account)

    }

}