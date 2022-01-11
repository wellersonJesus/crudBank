import { json, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Account from "../../entities/Account";
import { IAccountController, IAccountService } from "./structure";


//Class AccountController - RESPONSÁVEL POR PEGAR OS DADOS DO INPUt


export default class AccountController implements IAccountController{

    constructor(private accountService:IAccountService){}

    //Método create para criar uma nova conta
    async create(req: Request, res: Response): Promise<void> {
        const {typeAccount,balance,id_idUser} = req.body

        const account = await this.accountService.create({
            typeAccount,
            balance,
            id_idUser
        })

        res.status(201).json(account)
    }

    //Método find para buscar todas as contas existentes
    async find(req: Request, res: Response): Promise<void> {
        const accounts = await this.accountService.find()
        res.status(200).json(accounts)
    }

    //Métodio deposit para depositar algum valor no saldo da conta
    async deposit(req: Request, res: Response): Promise<void> {
        
        const {id} = req.params
        const{depositValue} = req.body

        const account = await this.accountService.deposit(id,depositValue)

        res.json(account)

    }

    //Método withdraw para sacar algum valor do saldo atual
    async withdraw(req: Request, res: Response): Promise<void> {
        
        const {id} = req.params
        const {withdrawValue} = req.body

        const account = await this.accountService.withdraw(id,withdrawValue)

        res.json(account)

    }

    //Método find extrato usuario 
    async balance(req: Request, res: Response): Promise<void> {
        const { id } = req.params;
        
        const balanceService = await this.accountService.balance(id)
        res.json(balanceService)
    }

}