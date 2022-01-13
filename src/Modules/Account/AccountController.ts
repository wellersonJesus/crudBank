import { json, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Account from "../../entities/Account";
import { IAccountController, IAccountService } from "./structure";
import AccountService from "./AccountService";

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
    //Definie o tipo da conta Pesso fisica ou Pessoa juridica
        let x = "Pessoa Fisica"
        let y = "Pessoa Juridica"
    
    function tipoConta(){      
            
            if (tipoConta) {
                    typeAccount == 0
                    return "Pessoa Fisica"                
            
                } else {
                typeAccount == 1
                return "Pessoa Juridica"                
            }
        }        

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

        if(account instanceof Error){
            res.json(account.message)
        }

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

    //Método find extrato usuario 
    async balance(req: Request, res: Response): Promise<void> {
        const { id } = req.params;        
        const balanceService = await this.accountService.balance(id)
        res.json(balanceService)
    }

     //Método deleted Account
    async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params
        const result = await this.accountService.delete(id)
        res.status(200).json(result)

    
    }
}