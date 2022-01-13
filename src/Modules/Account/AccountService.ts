import { json, Request, Response } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { ParsedQs } from "qs";
import Account from "../../entities/Account";
import { IAccountRepository, IAccountController, IAccountService } from "./structure";
import AccountService from "./AccountService";

//Class AccountController - RESPONSÁVEL POR PEGAR OS DADOS DO INPUt
export default class AccountController implements IAccountController{


    constructor(private accountRepository: IAccountRepository) {}

    //Método create para criar uma nova conta
    async create(req: Request, res: Response): Promise<void> {
        const {typeAccount,balance,id_idUser} = req.body

        const account = await this.accountRepository.create({
            typeAccount,
            balance,
            id_idUser

        })
    //Definie o tipo da conta Pesso fisica ou Pessoa juridica
    let PessoaFisica = 0, PessoaJuridica = 1;

    switch (PessoaFisica) {
        case 0:
            console.log("Result: 0");
            break;
        case 1:
            console.log("Result: 1");
            break;
        }}

    //Método find para buscar todas as contas existentes
    async find(req: Request, res: Response): Promise<void> {
        const accounts = await this.accountRepository.find()
        res.status(200).json(accounts)
    }

    //Método findBId busca account especifica
    async findById(id: string): Promise<Account | Error> {
        const account = await this.accountRepository.findById(id)
        return account
    }

    //Métodio deposit para depositar algum valor no saldo da conta
    async deposit(req: Request, res: Response): Promise<void> {
        
        const {id} = req.params
        const{depositValue} = req.body

        const account = await this.accountRepository.deposit(id,depositValue)

        res.json(account)

    }

    //Método withdraw para sacar algum valor do saldo atual
    async withdraw(req: Request, res: Response): Promise<void> {
        
        const {id} = req.params
        const {withdrawValue} = req.body

        const account = await this.accountRepository.withdraw(id,withdrawValue)

        res.json(account)

    }

    //Método find extrato usuario 
    async balance(req: Request, res: Response): Promise<void> {
        const { id } = req.params;        
        const balanceService = await this.accountRepository.balance(id)
        res.json(balanceService)
    }

    //Método deleted Account
    async delete(req: Request, res: Response): Promise<void> {
        const {id} = req.params
        const result = await this.accountRepository.delete(id)
        res.status(200).json(result)
    
    }
}