import  Account  from "../../entities/Account";
import { IAccount, IAccountRepository, IAccountService } from "./structure";

//Class AccountService - RESPONSÁVEL POR REGRAS DE NEGÓCIO

export default class AccountService implements IAccountService{

    constructor(
        private accountRepository:IAccountRepository
    ){}

    //Método create para criar uma nova conta
    async create({ id, typeAccount, balance, id_idUser}: IAccount): Promise<object | Error> {
        
        const account = await this.accountRepository.create({
            typeAccount,
            balance,
            id_idUser
        })

        return account

    }

    //Método find para buscar todas as contas existentes
    async find(): Promise<object | Error> {
        const accounts = this.accountRepository.find()
        return accounts
    }

    //Métodio deposit para depositar algum valor no saldo da conta
    async deposit(id: string, depositValue: number): Promise<object | Error> {

        const accounts = await this.accountRepository.deposit(id,depositValue)
        return accounts
    }

    //Método withdraw para sacar algum valor do saldo atual
    async withdraw(id: string, withdrawValue: number): Promise<object | Error> {

        const accounts = await this.accountRepository.withdraw(id,withdrawValue)
        return accounts

    }

}