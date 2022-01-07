import { Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import { IAccountController, IAccountService } from "./structure";


//Class AccountController - RESPONSÁVEL POR PEGAR OS DADOS DO INPUt


export default class AccountController implements IAccountController{

    constructor(private accountService:IAccountService){}

    //Método create para criar uma nova conta
    async create(req: Request, res: Response): Promise<void> {
        const {typeAccount,balance,id_idUser} = req.body

        //Validation inputs
        if(!typeAccount){
            res.status(422).json({message:"TypeAccount is required!"})
        }
        if(!id_idUser){
            res.status(422).json({message:"Id_idUser is required!"})
        }

        const account = await this.accountService.create({
            typeAccount,
            balance,
            id_idUser
        })

        if(account instanceof Error){
            res.json(account.message)
        }

        res.status(201).json(account)
    }

    //Método find para buscar todas as contas existentes
    async find(req: Request, res: Response): Promise<void> {
        const accounts = await this.accountService.find()
        res.status(200).json(accounts)
    }

    //Método findById para buscar conta especifica
    async findById(req: Request, res: Response): Promise<void> {
        const {id} = req.params
        const account = await this.accountService.findById(id)
        res.json(account)
    }

    //Métodio deposit para depositar algum valor no saldo da conta
    async deposit(req: Request, res: Response): Promise<void> {
        
        const {id} = req.params
        const{depositValue} = req.body

        //Validation Params
        if(!id){
            res.status(422).json({message:"Id is required!"})
        }

        //Validation Input
        if(!depositValue){
            res.status(422).json({message:"DepositValue is required!"})
        }

        const account = await this.accountService.deposit(id,depositValue)

        res.json(account)

    }

    //Método withdraw para sacar algum valor do saldo atual
    async withdraw(req: Request, res: Response): Promise<void> {
        
        const {id} = req.params
        const {withdrawValue} = req.body
        
        //Validation Params
        if(!id){
            res.status(422).json({message:"Id is required!"})
        }

        //Validation Input
        if(!withdrawValue){
            res.status(422).json({message:"WithdrawValue is required!"})
        }

        const account = await this.accountService.withdraw(id,withdrawValue)

        if(account instanceof Error){
            res.json(account.message)
        }

        res.json(account)

    }

}